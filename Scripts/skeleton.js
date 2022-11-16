function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./nav.html'));
    console.log($('#footerPlaceholder').load('./footer.html'));
    console.log($('#sidebarPlaceHolder').load('./text/sidebar.html'));
}
loadSkeleton();

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
