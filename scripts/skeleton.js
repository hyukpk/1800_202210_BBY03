function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('/text/nav.html'));
    console.log($('#footerPlaceholder').load('/text/footer.html'));
}
loadSkeleton();

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
