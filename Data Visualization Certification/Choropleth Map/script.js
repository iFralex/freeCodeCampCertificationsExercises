//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/data-visualization

const w = 1000
const hL = 100
const wL = w / 50
const padL = 30
const colorScale = d3.scaleSequential(d3.interpolateBlues)
const colorPScale = d3.scaleLinear().range([0.3, 1])

d3.select("body").append("h1").attr("id", "title").text("United States Educational Attainment")
d3.select("body").append("h2").attr("id", "description").text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")

const svg = d3.select("body").append("svg").attr("width", w).attr("height", 600)
d3.select("body").append("h2").text("Legend")
const legend = d3.select("body").append("svg").attr("width", w).attr("height", hL + padL).attr("id", "legend")
const tp = d3.select("body").append("div").attr("id", "tooltip").style("opacity", 0)
tp.append("p").style("margin", "0px")

d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json").then(education => d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json").then(us => {
  colorPScale.domain([d3.min(education, e => e.bachelorsOrHigher), d3.max(education, e => e.bachelorsOrHigher)])
  const path = d3.geoPath()
  
  svg
    .append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.counties).features)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('data-fips', d => d.id)
    .attr('data-education', d => {
      for (let i = 0; i < education.length; i++)
        if (education[i].fips === d.id)
          return education[i].bachelorsOrHigher
      return 0
    })
    .attr('fill', d => {
    for (let i = 0; i < education.length; i++)
        if (education[i].fips === d.id)
          return colorScale(colorPScale(education[i].bachelorsOrHigher))
    return "red"
  })
    .attr('d', path).on("mouseover", (e, d) => tp.style("opacity", 1).style("left", e.pageX + "px").style("top", e.pageY + "px").attr("data-education", () => {
      for (let i = 0; i < education.length; i++)
        if (education[i].fips === d.id)
          return education[i].bachelorsOrHigher
      return 0
    }).select("p").text(() => {
    let ed
    for (let i = 0; i < education.length; i++)
        if (education[i].fips === d.id)
          ed = education[i]
    return ed.area_name + " " + ed.state + ": " + ed.bachelorsOrHigher + "%"
  })).on("mouseout", () => tp.style("opacity", 0))

  const legendScale = d3.scaleLinear(colorPScale.domain(), [0, w])
  const cScale = d3.scaleLinear([0, 50], colorPScale.domain())
  legend.selectAll("rect").data(() => {
    let dataL = []
    for (let i = 0; i < 50; i++)
      dataL.push(cScale(i))
    return dataL
  }).enter().append("rect").attr("x", d => legendScale(d)).attr("y", 0).attr("width", wL).attr("height", hL).attr("fill", d => colorScale(colorPScale(d)))
  legend.append("g").attr("transform", "translate(0, " + hL + ")").call(d3.axisBottom(legendScale).tickValues((() => {
    let values = []
    for (let i = 0; i < colorPScale.domain()[1]; i += 5)
      if (i > colorPScale.domain()[0])
        values.push(i)
    return values
  })()).tickFormat(v => v + "%"))
}))