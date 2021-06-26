
  const room_id = $("#room_id").text()
  let person_id = ""
  $("#link").text(window.location.href.replace(/&master_id.*/,''))
  $("#send").on("click",()=>{
    const person = $("#person").val()
    const wolf = $("#wolf").val()

    $.ajax({
      url:'send_question',
      type:'GET',
      dataType:'json',
      data:{id:room_id,person:person,wolf:wolf},
      timeout:10000
    }).done((data)=>{
      $("#message").text(data.message)
    }).fail(()=>{
      alert("エラーだわ")
    })
  })
  $("#get_status").on("click", ()=>{
    $.ajax({
      url:'get_status',
      type:'GET',
      dataType:'json',
      data:{id:room_id},
      timeout:10000
    }).done((data)=>{
      $("#status").text(data.message)
    }).fail(()=>{
      alert("エラーだわ")
    })
  })
  $("#get_my_word").on("click",()=>{
    $.ajax({
      url:'get_my_word',
      type:'GET',
      dataType:'json',
      data:{id:room_id,person_id:person_id},
      timeout:10000
    }).done((data)=>{
      $("#message").text(data.message)
    }).fail(()=>{
      alert("エラーだわ")
    })
  })
  $("#join").on("click",()=>{
    $.ajax({
      url:'join',
      type:'GET',
      dataType:'json',
      data:{id:room_id,name:$("#user_name").val()},
      timeout:10000
    }).done((data)=>{
      person_id = data.person_id
      console.log(`person_id:${person_id}`)
      $("#user_name").hide()
      $("#join").hide()
      $("#user_name_display").text(":" + $("#user_name").val())
    }).fail(()=>{
      alert("エラーだわ")
    })
  })
  $('#number_of_wolves').on('change',()=>{
    $.ajax({
      url:'num_change',
      type:'GET',
      dataType:'json',
      data:{id:room_id,number:$('#number_of_wolves').val()},
      timeout:10000
    }).done((data)=>{
      $("#status").text(data.message)
    }).fail(()=>{
      alert("エラーだわ")
    })
  })