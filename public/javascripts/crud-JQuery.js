$(function() {

	$('#exampleModal').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget) // Button that triggered the modal
	  var user = button.data('user') // Extract info from data-* attributes
	  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	  var modal = $(this)
	  if(user){
	  	 modal.find('.modal-title').text('修改 ' + user.name+ ' 的个人信息');
	  }else{
	  	modal.find('.modal-title').text('新增联系人信息');
	  }
	 
//	  modal.find('#user-name').val(user.name);
//	  modal.find('#user-id').val(user.card_id);
//	  modal.find('#user-phone').val(user.phone);
//	  modal.find('#user-birthday').val(user.birthday);
	})
});
