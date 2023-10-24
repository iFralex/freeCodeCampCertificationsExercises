//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/data-visualization

const w = 1000
const h = 1000
const hL = 30
const wL = 30
const padXL = 160
const padYL = 70
const svg = d3.select("body").append("svg").attr("width", w).attr("height", h)
const tp = d3.select("body").append("div").attr("id", "tooltip").attr("opacity", 0)
tp.append("p").style("margin", "0px")
const treemap = d3.treemap().size([w, h])
const colorScale = d3.scaleOrdinal().range(["#FF5733","#2ECC71","#3498DB","#E74C3C","#9B59B6","#F39C12","#1ABC9C","#34495E","#27AE60","#E67E22","#2980B9","#8E44AD","#D35400","#C0392B","#16A085","#2C3E50","#F1C40F","#7F8C8D","#95A5A6","#FDE3A7"])

d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json").then(data => {
  colorScale.domain([data.children.map(d => d.name)])
  var root = d3
      .hierarchy(data)
      .eachBefore(function (d) {
        d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
      })
      .sum(v => v.value)
      .sort((a, b) => b.height - a.height || b.value - a.value)
    treemap(root)
  
  svg.selectAll("rect").data((() => {
    let cells = []
      root.children.forEach(d => cells.push(...d.children))
    return cells
  })()).enter().append("rect").attr("class", "tile").attr("data-name", d => d.data.name).attr("data-category", d => d.data.category).attr("data-value", d => d.data.value).attr("x", d => d.x0).attr("y", d => d.y0).attr("width", d => d.x1 - d.x0 - 1).attr("height", d => d.y1 - d.y0 - 1).attr("fill", d => colorScale(d.data.category)).on("mouseover", (e, d) => tp.style("opacity", 1).style("left", ((e.target.getBoundingClientRect().right + e.target.getBoundingClientRect().left) / 2 + window.scrollX || window.pageXOffset) + "px").style("top", (e.target.getBoundingClientRect().bottom + window.scrollY || window.pageYOffset) + "px").attr("data-value", d.data.value).select("p").html("Name: " + d.data.name + "<br>Category: " + d.data.category + "<br>Value: " + d.data.value)).on("mouseout", (e, d) => tp.style("opacity", 0))
  
  d3.select("body").append("h2").text("Legend")
  const legend = d3.select("body").append("svg").attr("id", "legend").attr("width", w).attr("height", padYL * 3)
  
  legend.selectAll("rect").data(data.children.map(d => d.name)).enter().append("rect").attr("class", "legend-item").attr("x", (d, i) => (i % 6) * padXL).attr("y", (d, i) => (i - (i % 6)) / 6 * padYL).attr("width", wL).attr("height", hL).attr("fill", d => colorScale(d))
  legend.selectAll("text").data(data.children.map(d => d.name)).enter().append("text").attr("x", (d, i) => (i % 6) * padXL + wL + 5).attr("y", (d, i) => (i - (i % 6)) / 6 * padYL + 25).text(d => d)
})