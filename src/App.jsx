import { useState } from 'react'
import './App.css'

function App() {

  const url = `https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json`

  fetch(url).then((res) => res.json()).then((data) => {
    const json = data
    const dataset = json.data

  console.log()
  const title = json.source_name

  document.getElementById("title").textContent = title

  const width = 1100
  const height = 500
  const padding = 60

  // create svg
  // x-axes - scaleTime here since value is a year

  const svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height)

  const xScale = d3
  .scaleTime()
  .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0]), ])
  .range([padding, width - padding])
  
  const xAxis = d3
  .axisBottom(xScale)
  .tickFormat(d3.timeFormat("%Y"))
  
  svg
  .append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${height - padding})`)
  .call(xAxis)
  .style("font-size", "16px")
  .selectAll(".tick")
  .attr("class", "tick")

// y-axis
const yScale = d3.scaleLinear()
.domain([0, (dataset, d3.max(dataset, (d) => d[1]))])
.range([height - padding, padding])

  const yAxis = d3.axisLeft(yScale)

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding})`)
    .call(yAxis)
    .selectAll(".tick")
    .attr("class", "tick")
    .style("font-size", "16px")

    // now let's add rextangle box i.e create a bar graph

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("x", (d) => xScale(new Date(d[0])))
    .attr("y", (d) => yScale(d[1]))
    .style("width", (width - 2 * padding) / dataset.length)
    .style("height", (d) => height - padding - yScale(d[1]))
    .attr("fill", "blue")

// we want to show tooltip when mouse is over the bar graph thus add the event listener in te each rect
.on("mouseenter", function (e, d) {
  const tooltip = d3.select("#tooltip")

  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0.9)
    .style("left", e.pageX + 10 + "px")
    .style("top", e.pageX + 10 + "px")
    .style("font-size", "15px")
    
  tooltip
    .attr("data-date", d([0])
    .html(`${d[0].split(/-/)[0]} <br/> $${d[1]} Billion`))

  console.log("mouse over event")
})

  .on("mouseleave", function (e) {
    d3.select("#tooltip").style("opacity", 0)
  })

// let's create a tooltip
const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "rgba(0, 0, 0, 0.8")
    .style("color", "#fff")
    .style("padding", "10px")


})

}

export default App
