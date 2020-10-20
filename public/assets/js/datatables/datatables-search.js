// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable();
});

$(document).ready(function() {
  $('#filingTable').DataTable({"order": [[ 3, "desc" ]]});
})

$(document).ready(function() {
  $('#filingTableSuper').DataTable({"order": [[ 2, "desc" ]]});
})