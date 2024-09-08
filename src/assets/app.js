
if (document.getElementById('heading')) {
    const header = document.getElementById('heading');
    const menu = header.querySelector('.center ul');
    menu.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', (e) => {
            console.log(e);
        })
    })
}
