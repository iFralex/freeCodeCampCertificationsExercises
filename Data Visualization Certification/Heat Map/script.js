//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/data-visualization

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
const w = 2000
const h = 300
const padding = 60

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h)
let legend = d3.select("body").append("div")
legend.append("h2").text("Legend")
const tp = d3.select("body").append("div").attr("id", "tooltip").style("opacity", 0).style("top", "0px").style("left", "0px")
const tpTemps = tp.append("div").style("display", "flex").style("justify-content", "space-between")
const tpTemp = tpTemps.append("div").attr("class", "tp temp")
tpTemp.append("p").style("color", "black")
const tpVar = tpTemps.append("div").attr("class", "tp temp")
tpVar.append("p")
const tpDate = tp.append("div").attr("class", "tp date")
tpDate.append("p").style("margin", "0px")

d3.json(url).then(data => {
  const baseTemp = data.baseTemperature
  data = data.monthlyVariance.map(d => {d.temp = d.variance + baseTemp;return d})
  console.log(data.map(d => d.temp))
  const yMin = d3.min(data, d => d.year)
  const yMax = d3.max(data, d => d.year)
  const wCell = (w - padding) / (yMax - yMin)
  const hCell = (h - padding * 2) / 12

  let years = []
  for (let i = 0; i <= yMax - yMin; i++)
    years.push(i + yMin)
  console.log(years)
  const xScale = d3.scaleBand().domain(years).range([padding, w - padding])
const yScale = d3.scaleBand().domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).range([padding, h - padding]);
const tempScale = d3.scaleSequential(d3.interpolateTurbo)
  const tempCScale = d3.scaleLinear().domain([d3.min(data, d => d.temp), d3.max(data, d => d.temp)]).range([0, 1])
  
  svg.append("g").classed('x-axis', true).attr("id", "x-axis").attr("transform", "translate(0, " + (h - padding) + ")").call(d3.axisBottom(xScale).tickValues(years.filter(d => d % 10 === 0)).tickFormat(y => y.toString()))
  svg.append("g").attr("id", "y-axis").attr("transform", "translate(" + padding + ", 0)").call(d3.axisLeft(yScale).tickFormat(m => {let da = new Date();da.setMonth(m - 1);return da.toLocaleString('en-US', { month: 'long' })}))
  
  svg.selectAll("rect").data(data).enter().append("rect").attr("class", "cell").attr("x", d => xScale(d.year)).attr("y", d => yScale(d.month)).attr("width", wCell).attr("height", hCell).attr("fill", d => tempScale(tempCScale(d.temp))).attr("data-month", d => d.month - 1).attr("data-year", d => d.year).attr("data-temp", d => d.temp).on("mouseover", (e, d) => {
    tp.style("opacity", 1).style("left", (e.x + window.pageXOffset) + "px").style("top", (e.y + window.pageYOffset) + "px").attr("data-year", d.year)
    tpTemp.style("background-color", tempScale(tempCScale(d.temp))).select("p").text(Math.round(d.temp * 10) / 10)
    tpVar.style("background-color", d.variance > 0 ? "#0b0" : "red").select("p").text((d.variance > 0 ? "+" : "") + Math.round(d.variance * 10) / 10)
    tpDate.select("p").text(() => {let da = new Date();da.setMonth(d.month - 1);return da.toLocaleString('en-US', { month: 'long' }) + " " + d.year})
    console.log(this)
  }).on("mouseout", () => tp.style("opacity", 0))

  legend = legend.append("svg").attr("width", wCell * 100 + padding).attr("height", hCell * 2 + padding).attr("id", "legend")
  let s = d3.scaleLinear().domain(tempCScale.range()).range(tempCScale.domain())
  let temps = []
  for (let i = 0; i < 1; i += 0.02)
    temps.push(s(i))
  s.range([padding, padding + wCell * 100]).domain(tempCScale.domain())
  legend.selectAll("rect").data(temps).enter().append("rect").attr("x", d => s(d)).attr("y", 0).attr("width", (d, i) => wCell * 2).attr("height", hCell * 2).attr("fill", d => tempScale(tempCScale(d)))
  legend.append("g").attr("transform", "translate(0, " + (hCell * 2) + ")").call(d3.axisBottom(s).tickFormat(d => d + " °C"))
})