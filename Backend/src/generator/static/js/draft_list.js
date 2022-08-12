const hambugerMenu = document.querySelector('.hambuger_icon')
const closeMenu = document.querySelector('.close_menu')
const mobileMenu = document.querySelector('.mobile_col')
const deleteBtn = document.querySelectorAll('.delete_btn')
const popUp = document.querySelector('.pop-up-delete')
const toggleBtn = document.querySelector('.color_toggle_container')
const toggleEl = document.querySelector('.toggle')
const listView = document.querySelector('.list')
const girdView = document.querySelector('.grid')
const listViewChanger = document.querySelector('.list_icon_view')
const gridViewChanger = document.querySelector('.grid_icon_view')

listViewChanger.addEventListener('click', ()=>{
    listView.classList.add('show_grid')
    girdView.classList.add('show_grid')
    // girdView.classList.add('show_grid')

})

gridViewChanger.addEventListener('click', ()=>{
    listView.classList.remove('show_grid')
    girdView.classList.remove('show_grid')
    // girdView.classList.add('show_grid')

})



// Responsive Nav bar functionality
hambugerMenu.addEventListener('click', ()=>{
    mobileMenu.classList.add('show_menu')
})

closeMenu.addEventListener('click', () =>{
    mobileMenu.classList.remove('show_menu')
})


//  Pop Up Delete Modal
deleteBtn.forEach(btn =>{
    btn.addEventListener('click', function(){
        popUp.classList.toggle('show')
    })
})


popUp.addEventListener('click', ()=>{
    popUp.classList.toggle('show')
})

// Color Mode Toggle
toggleBtn.addEventListener('click', ()=>{
    toggleEl.classList.toggle('light_toggle')
    toggleBtn.classList.toggle('light_toggle_con')
    document.body.classList.toggle('light-mode')
})