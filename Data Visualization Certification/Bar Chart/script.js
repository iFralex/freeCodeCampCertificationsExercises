//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/data-visualization

const w = document.getElementById("body").clientWidth
const h = document.getElementById("body").clientHeight
const padding = 40
let dataset

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(r => r.json()).then(d => { 
  dataset = d.data.map(i => [new Date(i[0]), i[1], i[0]])
  //const calcDate = date => parseInt(date.slice(0, 4)) + ((parseInt(date.slice(5, 7)) - 1) / 12)
  
const xScale = d3.scaleTime().domain([d3.min(dataset, d => d[0]), new Date("2015-10-01")]).range([padding, w - padding])
const yScale = d3.scaleLinear().domain([0, d3.max(dataset, d => d[1])]).range([h - padding, padding])
const maxHS = d3.max(dataset, d => d[1])

const svg = d3.select("div").append("svg").attr("width", w).attr("height", h)
const tp = d3.select("div").append("div").style("max-width", "200px").style("padding", "2px 5px").style("border", "1px solid black").style("border-radius", "5px").style("opacity", 0).style("background-color", "white").style("position", "absolute").style("transform", "translate(-50%, calc(-100% - 5px))").attr("id", "tooltip")

svg.selectAll("rect").data(dataset).enter().append("rect").attr("x", d => xScale(d[0])).attr("y", d => yScale(d[1])).attr("width", (w - padding) / (dataset.length)).attr("height", d => h - padding - yScale(d[1])).style("fill", d => "rgb(" + (200 - d[1] / maxHS * 128) + ", " + d[1] / maxHS * 128 + ", " + d[1] / maxHS * 255 + ")").attr("class", "bar").attr("data-date", d => d[2]).attr("data-gdp", d => d[1]).on("mouseover", (e, d) => tp.style("top", (yScale(d[1])) + "px").style("left",  + xScale(d[0]) + "px").html(["Q1", "Q2", "Q3", "Q4"][(d[0].getMonth()) / 3] + " " + d[0].getFullYear() + "<br>" + "$" + d[1] + " Bilion").attr("data-date", d[2]).style("opacity", 1)
).on('mouseout', () => tp.style("opacity", 0))
  
  svg.append("text").text("My Chart").attr("id", "title").attr("x", 0).attr("y", 30).style("font-weight", "bold")
  
  svg.append("g").attr("transform", "translate(0, " + (h - padding) + ")").attr("id", "x-axis").call(d3.axisBottom().scale(xScale))
  svg.append("g").attr("transform", "translate(" + padding + ", 0)").attr("id", "y-axis").call(d3.axisLeft().scale(yScale))
})