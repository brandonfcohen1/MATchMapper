window.onunload = function(){}

function removeBlanks(array){
  var filtered = array.filter(function (el) {
      return el != "";
  })
  return filtered
}

var enabledIsFilters = []
var enabledNotFilters = []
var searchTerm = "None"
var orderAbsoluteValue = ""
var orderPolarity = ""
var selectedIDs = []

function readFilters(){
  console.log(enabledIsFilters)
  if(window.location.pathname.split("/").length > 3){
    var filterPathElements = window.location.pathname.split("/").splice(3)
    var enabledIsFilterString = filterPathElements[0]
    if(enabledIsFilterString != "None" && enabledIsFilterString != ""){
      for(filter of enabledIsFilterString.split("&")){
        enableFilter(filter.replace("%3D","="), false)
        revealPredicated(filter.replace("%3D","="), false)
      }
    }
    if(filterPathElements.length >= 2){
      var enabledNotFilterString = filterPathElements[1]
      if(enabledNotFilterString != "None" && enabledNotFilterString != ""){
        for(filter of enabledNotFilterString.split("&")){
          enableFilter(filter.replace("%3D","="), true)
          revealPredicated(filter.replace("%3D","="), true)
        }
      }
    }
    if(filterPathElements.length >= 3){
      searchTerm = filterPathElements[2]
      fillSearchBar()
    }
  }
  if(window.location.search != ""){
    var queryStringElements = window.location.search.replace("?","").split("&")
    var orderStringElements = []
    for(var element of queryStringElements){
      if(element.split("=")[0] == "order"){
        orderStringElements.push(element)
      }
    }
    var orderString = orderStringElements.join("&")
    if(orderString.includes("=-")){
      orderPolarity = "-"
      orderAbsoluteValue = orderString.replace(/=-/g,"=")
    }
    else {
      orderAbsoluteValue = orderString
    }
    document.querySelector("#sortBy").value = orderAbsoluteValue
    if(orderPolarity == "-"){
      document.querySelector("#orderingOptions").value = "-"
    }
    else {
      document.querySelector("#orderingOptions").value = ""
    }
    for(var element of queryStringElements){
      if(element.split("=")[0] == "selected"){
        selectedIDs = element.split("=")[1].split(",")
        for(var id of selectedIDs){
          document.querySelector("#" + id).classList.add("selected")
        }
      }
    }
  }
}

function revealPredicated(absoluteValue, isNegative){
  var predicationString = absoluteValue
  if(isNegative){
    predicationString = predicationString.replace("=","!=")
  }
  for(var subfilterSection of document.querySelectorAll(".subfilter")){
    if(subfilterSection.getAttribute("predicate") == predicationString){
      subfilterSection.classList.add("visible")
    }
  }
}

function disablePredicated(absoluteValue, isNegative){
  var predicationString = absoluteValue
  if(isNegative){
    predicationString = predicationString.replace("=","!=")
  }
  for(var subfilterSection of document.querySelectorAll(".subfilter")){
    if(subfilterSection.getAttribute("predicate") == predicationString){
      for(var filterCriteria of subfilterSection.querySelectorAll(".filterCriteria")){
        if(filterCriteria.classList.contains("selected")){
          var filterValue = filterCriteria.querySelector("input").value
          var isNegative = (filterValue.split("=")[1].charAt(0) == "!")
          var absoluteValue = filterValue.replace("=!", "=")
          disableFilter(absoluteValue, isNegative)
        }
      }
    }
  }
}

function fillSearchBar(){
  document.querySelector("#searchBar").value = searchTerm
}

$(document).ready(function() {
  readFilters()
})

function setFilterEventListeners(){
  function specifierClick(e, apply, toggleOpposite){
    if(e.currentTarget == undefined){
      e = {currentTarget: e}
    }
    var newFilters = e.currentTarget.getAttribute("value").split("&")

    for(var i in newFilters){
      if(newFilters[i][0] == "!"){
        newFilters[i] = newFilters[i].substring(1).replace("=","=!")
      }
    }
    if(selectedIDs.includes(e.currentTarget.id)){
      selectedIDs = selectedIDs.filter(d => d != e.currentTarget.id)
    }
    else {
      selectedIDs.push(e.currentTarget.id)
    }

    if(e.currentTarget.classList.contains("equal")){
      var oppositeSpecifier = e.currentTarget.parentElement.querySelector(".notequal")
    } else {
      var oppositeSpecifier = e.currentTarget.parentElement.querySelector(".equal")
    }
    
    if(toggleOpposite != false && oppositeSpecifier.classList.contains("selected")){
      specifierClick(oppositeSpecifier, false, false)
    }
    toggleFilter(newFilters, apply)
  }
  $(".equal, .notequal").click(specifierClick)

  $("#clearFilters").click(function(e){
    clearFilters()
  })
  
  $("#searchBar").on('keypress',function(e) {
    if(e.which == 13) {
        search(e.currentTarget.value)
    }
  })
  
  $("#sortOptions, #orderingOptions").change(function(e){
    if(document.querySelector("#sortBy").value != ''){
      if(document.querySelector("#orderingOptions").value == "None"){
        document.querySelector("#orderingOptions").value = ""
      }

      orderAbsoluteValue = document.querySelector("#sortBy").value
      orderPolarity = document.querySelector("#orderingOptions").value

      applyFilters()
    }
  })
}
setFilterEventListeners()

function toggleFilter(filterValues, apply){
  if(typeof filterValues === 'string' || filterValues instanceof String){
    filterValues = [filterValues]
  }
  for(var filterValue of filterValues){
    var isNegative = (filterValue.split("=")[1].charAt(0) == "!")
    var absoluteValue = filterValue.replace("!","")
    if(isNegative){
      if(enabledNotFilters.includes(absoluteValue)){
        disableFilter(absoluteValue, isNegative)
      } else {
        enableFilter(absoluteValue, isNegative)
        if(enabledIsFilters.includes(absoluteValue)){
          disableFilter(absoluteValue, !(isNegative))
        }
      }
    } else {
      if(enabledIsFilters.includes(absoluteValue)){
        disableFilter(absoluteValue, isNegative)
      } else {
        enableFilter(absoluteValue, isNegative)
        if(enabledNotFilters.includes(absoluteValue)){
          disableFilter(absoluteValue, !(isNegative))
        }
      }
    }
  }
  if(apply != false){
    applyFilters()
  }
}

function enableFilter(absoluteValue, isNegative){
  // highlight(absoluteValue, isNegative)
  if(isNegative){
    enabledNotFilters.push(absoluteValue)
  } else {
    enabledIsFilters.push(absoluteValue)
  }
}

function disableFilter(absoluteValue, isNegative){
  // unhighlight(absoluteValue, isNegative)
  disablePredicated(absoluteValue, isNegative)
  if(isNegative){
    enabledNotFilters = excludeFromArray(enabledNotFilters, absoluteValue)
  } else {
    enabledIsFilters = excludeFromArray(enabledIsFilters, absoluteValue)
  }
}

function getElementByFilter(absoluteValue, isNegative){
  for(var el of document.querySelectorAll(".filterCriteria")){
    if(el.querySelector("input").value == absoluteValue){
      if(isNegative){
        return el.querySelector(".notequal")
      } else {
        return el.querySelector(".equal")
      }
    }
  }
  return null
}

function highlight(el){
  el.classList.add("selected")
}

function unhighlight(el){
  el.classList.add("selected")
}

function unhighlightAll(){
  for(var el of document.querySelectorAll(".filterCriteria")){
    el.classList.remove("selected")
  }
}

function excludeFromArray(arr, val){
  return arr.filter(function(value, index, arr){ 
    return value != val;
  })
}

function search(term){
  if(term == ""){
    searchTerm = "None"
  } else{
    searchTerm = term
  }
  applyFilters()
}

function getNewQueryString(){
  var q = "?"
  if(orderAbsoluteValue != ""){
    var orderString = ""
    if(orderPolarity == "-"){
      orderString = orderAbsoluteValue.replace(/=/g,"=-")
    }
    else {
      orderString = orderAbsoluteValue
    }
    q = q + orderString
  }
  if(removeBlanks(selectedIDs).length != 0){
    q = q + "&selected=" + removeBlanks(selectedIDs).join(",")
  }
  return q
}

function applyFilters(){
  var basePathElements = removeBlanks(window.location.pathname.split("/")).splice(0,2)
  var isFilterString = enabledIsFilters.join("&")
  var notFilterString = enabledNotFilters.join("&")
  if(isFilterString == ""){
    isFilterString = "None"
  }
  if(notFilterString == ""){
    notFilterString = "None"
  }
  var filterPathElements = [isFilterString, notFilterString, searchTerm]
  var fullPathElements = basePathElements.concat(filterPathElements)
  while(fullPathElements[fullPathElements.length - 1] == "None"){
    fullPathElements.pop()
  }
  console.log(searchTerm)
  var fullPath = fullPathElements.join("/")

  var newQueryString = getNewQueryString()
  console.log(window.location.origin + "/" + fullPath + newQueryString)
  window.location.href = window.location.origin + "/" + fullPath + newQueryString
}

function clearFilters(){
  enabledIsFilters = []
  enabledNotFilters = []
  searchTerm = "None"
  orderString = ""
  unhighlightAll()
  window.history.replaceState( {} , "title", window.location.href.split("?")[0] );
  orderPolarity = ""
  orderAbsoluteValue = ""
  selectedIDs = []
  applyFilters()
}