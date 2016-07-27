export function displayWorldPartial(msg) {
  var partial = msg.body;
  var resp_time = Date.now() - msg.req_time;
  $('#partial').html(`Current Response time: ${resp_time}ms<br>`);
  $('#partial').append("<b>You:</b> <br>");
  $('#partial').append(JSON.stringify(partial[0]));
  $('#partial').append("<br><br> <b>Other Nodes:</b> <br>");
  
  for (let n = 1; n < partial.length; n++) {
      $('#partial').append(JSON.stringify(partial[n]));
      $('#partial').append("<br>");
  }
}
