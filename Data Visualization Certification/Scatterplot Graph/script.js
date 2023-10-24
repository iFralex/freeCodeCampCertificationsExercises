//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/data-visualization

const w = document.getElementById("body").clientWidth
const h = document.getElementById("body").clientHeight
const padding = 50

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("fill", "red").style("position", "relative")
      
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then(data => {
  data = data.map(d => {d.Time = new Date(new Date().setMinutes(d.Time.substring(0, 2), d.Time.substring(3, 5)));return d})
  const xScale = d3.scaleLinear().domain([d3.min(data, d => d.Year) - 1, d3.max(data, d => d.Year) + 1]).range([padding, w - padding])
  const yScale = d3.scaleTime().domain([d3.min(data, d => d.Time), d3.max(data, d => d.Time)]).range([padding, h - padding])

  svg.append("g").attr("transform", "translate(0, " + (h - padding) + ")").attr("id", "x-axis").call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
  svg.append("g").attr("transform", "translate(" + padding + ", 0)").attr("id", "y-axis").call(d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S')))
  
  svg.append("text").attr("text-anchor", "middle").attr("x", w / 2).attr("y", padding).attr("id", "title").text("Scatter Plot")
  const legend = d3.select("body").append("div").attr("id", "legend")
  legend.append("h2").text("Legend").style("margin-bottom", "4px")
  const leg1 = legend.append("div").attr("class", "box-container")
  leg1.append("div").attr("class", "box").style("background-color", "red")
  leg1.append("span").attr("class", "box-label").text("No doping allegations")
  const leg2 = legend.append("div").attr("class", "box-container")
    leg2.append("div").attr("class", "box").style("background-color", "blue")
    leg2.append("span").attr("class", "box-label").text("Riders with doping allegations")
const tp = d3.select("body").append("div").attr("id", "tooltip").style("opacity", 0).style("transform", "translate(0%, 0)")
  
  svg.selectAll("circle").data(data).enter().append("circle").attr("class", "dot").attr("data-xvalue", d => d.Year).attr("data-yvalue", d => d.Time).attr("cx", d => xScale(d.Year)).attr("cy", d => yScale(d.Time)).attr("r", 5).attr("fill", d => d.Doping !== "" ? "red" : "blue").on("mouseover", (e, d) => tp.style("opacity", 1).html(d.Name + ": " + d.Nationality + "<br>Year: " + d.Year + ", " + d.Time.getMinutes() + ":" + d.Time.getSeconds() + (d.Doping !== "" ? "<br><br>" + d.Doping : "")).style("left", (xScale(d.Year) + 15) + "px").style("top", yScale(d.Time) + "px").attr("data-year", d.Year)).on("mouseout", (e, d) => tp.style("opacity", 0))
})