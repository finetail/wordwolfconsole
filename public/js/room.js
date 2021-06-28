
const room_id = $("#room_id").text().replaceAll(/\s/g, '')
let person_id = ""
const TIMEOUT = 100000
const AJAX_FAILED_MESSAGE = "エラーだわ"
$("#link").text(window.location.href.replace(/&master_id.*/, ''))
$("#send").on("click", () => {
  const person = $("#person").val()
  const wolf = $("#wolf").val()

  $.ajax({
    url: 'send_question',
    type: 'GET',
    dataType: 'json',
    data: { id: room_id, person: person, wolf: wolf },
    timeout: TIMEOUT
  }).done((data) => {
    $("#message").text(data.message)
    $('#vote_area').show()
  }).fail(() => {
    alert(AJAX_FAILED_MESSAGE)
  })
})
$("#get_status").on("click", () => {
  $.ajax({
    url: 'get_status',
    type: 'GET',
    dataType: 'json',
    data: { id: room_id },
    timeout: TIMEOUT
  }).done((data) => {
    $("#status").text(data.message)
  }).fail(() => {
    alert(AJAX_FAILED_MESSAGE)
  })
})
$("#get_my_word").on("click", () => {
  $.ajax({
    url: 'get_my_word',
    type: 'GET',
    dataType: 'json',
    data: { id: room_id, person_id: person_id },
    timeout: TIMEOUT
  }).done((data) => {
    $("#message").text(data.message)
    $('#vote_area').show()
    $("#vote_button").show()
    $('#vote_select').children().remove()
    $('#vote_select').append(data.vote_select)
  }).fail(() => {
    alert(AJAX_FAILED_MESSAGE)
  })
})
$("#join").on("click", () => {
  $.ajax({
    url: 'join',
    type: 'GET',
    dataType: 'json',
    data: { id: room_id, name: $("#user_name").val() },
    timeout: TIMEOUT
  }).done((data) => {
    person_id = data.person_id
    console.log(`person_id:${person_id}`)
    $("#user_name").hide()
    $("#join").hide()
    $("#user_name_display").text(":" + $("#user_name").val())
  }).fail(() => {
    alert(AJAX_FAILED_MESSAGE)
  })
})
$('#number_of_wolves').on('change', () => {
  $.ajax({
    url: 'num_change',
    type: 'GET',
    dataType: 'json',
    data: { id: room_id, number: $('#number_of_wolves').val() },
    timeout: TIMEOUT
  }).done((data) => {
    $("#status").text(data.message)
  }).fail(() => {
    alert(AJAX_FAILED_MESSAGE)
  })
})
$('#vote_button').on('click', () => {
  $.ajax({
    url: 'vote',
    type: 'GET',
    dataType: 'json',
    data: { id: room_id, target: $('#vote_select').val() },
    timeout: TIMEOUT
  }).done(() => {
    $("#vote_button").hide()
    $('#status').text('投票完了までお待ち下さい')
  }).fail(() => {
    alert(AJAX_FAILED_MESSAGE)
  })
})
$('#get_vote_result_button').on('click', () => {
  $.ajax({
    url: 'get_vote_result',
    type: 'GET',
    dataTypes: 'json',
    data: { id: room_id },
    timeout: TIMEOUT
  }).done((data) => {
    $("#message").text(data.message)
    if (data.reset) {
      $('#vote_area').hide()
    }
  }).fail(() => {
    alert(AJAX_FAILED_MESSAGE)
  })
})