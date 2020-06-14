// TODO: Why jQuery? We should use vanilla JS or explicitly inject jQuery to page
import $ from 'jquery'

// TODO: Refactor this file

window.onhashchange = locationHashChanged

// Deprecated since 3.0. Use jQuery(function() { })
$(document).ready(function () {
  initHack()
})

function locationHashChanged() {
  initHack()
}

function initHack() {
  $('#custom-css').remove()
  if (window.location.href.includes('kibana#/dashboard/')) {
    const url = window.location.href.match(
      new RegExp('dashboard/' + '(.*)' + '?_a=')
    )
    const fileName = url[1].substring(0, url[1].length - 1)
    getCssData(fileName)
  }
}

function getCssData(fileName) {
  $.ajax('/api/custom-css/getObjectCss?objectId=' + fileName + '', {
    success: function (data) {
      var cssBlock = '<style>' + data + '</style>'

      $('body').append('<div id="custom-css"></div>')
      $('#custom-css').html(cssBlock)
    },
    error: function (error) {
      // TODO: catch error
      console.log(error)
    },
  })
}
