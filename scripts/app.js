(function(){
    let slider = new Slider({
        el:document.querySelector('#slider'),
        slides:[
            {link: '#1', image: 'images/1.jpg'},
            {link: '#2', image: 'images/2.jpg'},
            {link: '#3', image: 'images/3.jpg'},
            {link: '#4', image: 'images/4.jpg'},
            {link: '#5', image: 'images/5.jpg'}
        ]
    })
    window.slider = slider
})()