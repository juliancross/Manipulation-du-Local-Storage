$(document).ready(function() {


    function close() {
        $('.contact').animate({ left: '0' });
        if ($('.contact').position().left != 0) {
            $('.cross').css({ transform: "translateX(400px)" });
            $('.container').css({ transform: "translateX(200px)" });
        } else {
            $('.cross').css({ transform: "translateX(0px)" });
            $('.contact').animate({ left: '-400px' });
            $('.container').css({ transform: "translateX(0px)" });
            $('.contact textarea').html('');
            $('input[type="date"]').attr('value', '');
            $('input[type="text"]').attr('value', '');
        }
    }

    $('.cross').click(function() {
        close();
    });

    /////////////DEBUT DU LOCAL STORAGE/////////////////////////////////////////////   

    $('.ajouter').click(function(event) { // Création d'un événement
        // event.preventDefault();       
        var text = $('.contact textarea').val(); // on récupére la valeur du textarea 
        var date = $('input[type="date"]').val();
        var text2 = $('input[type="text"]').val();
        var tab = JSON.parse(localStorage.getItem('mes-notes')) || []; // création du nom de la clé

        tab.push({
            text: text,
            date: date,
            text2: text2,
            statut: 'on'
        });

        localStorage.setItem('mes-notes', JSON.stringify(tab));
    });


    var x = JSON.parse(localStorage.getItem('mes-notes'));


    $('.base li p').on('click', function() {
        close();


        var index = $(this).index('p');
        console.log(index);


        var resultatText = x[index].text;
        console.log(resultatText);
        console.log(resultatText);
        var resultatDate = x[index].date;
        var resultatText2 = x[index].text2;

        $('.contact textarea').val(resultatText);
        $('input[type="date"]').attr('value', resultatDate);
        $('input[type="text"]').attr('value', resultatText2);


        $('.modification').on('click', function() {
            x[index].text = $('.contact textarea').val();
            x[index].date = $('input[type="date"]').val();
            x[index].text2 = $('input[type="text"]').val();
            localStorage.setItem('mes-notes', JSON.stringify(x));
        });


        $('.remove').click(function(event) {
            x.splice(index, 1);
            localStorage.setItem('mes-notes', JSON.stringify(x));
            close();

        });
    });

    var x = JSON.parse(localStorage.getItem('mes-notes'));

    $('i').on('click', function() {
        var p = $(this).next('p');
        console.log(p);

        var index = $(this).parent().index('li');

        var closed = $('ul li:nth-of-type(' + (index + 1) + ') i:nth-of-type(1)');
        var closed2 = $('ul li:nth-of-type(' + (index + 1) + ') i:nth-of-type(2)');

        // console.log(closed2);

        if (closed.hasClass('closed')) {
            x[index].statut = 'off';
            $(closed).removeClass('closed');
            $(closed2).addClass('closed');
            p.css('text-decoration', 'line-through');
            // $('i').css('color','green');          

        } else {
            x[index].statut = 'on';
            $(closed).addClass('closed');
            $(closed2).removeClass('closed');
            $('i').next('p').css('text-decoration', 'none');
        }

        localStorage.setItem('mes-notes', JSON.stringify(x));
    });
});


$(window).on('load', function() {

    var tab = JSON.parse(localStorage.getItem('mes-notes')) || [];
    var ul = $('.base');
    ul.html("");

    tab.sort(function(a, b) {
        return Date.parse(a.date) - Date.parse(b.date);
    });

    localStorage.setItem('mes-notes', JSON.stringify(tab));
    for (var i = 0; i < tab.length; i++) {
        ul.append("<li>" + '<i class="fa fa-eye-slash closed" aria-hidden="true"></i>' + '<i class="fa fa-eye" aria-hidden="true"></i>' + '<p>' + tab[i].text + ' ' + tab[i].date + ' ' + tab[i].text2 + '</p>' + "</li>");
        // ('<i class="fa fa-eye" aria-hidden="true"></i>');
    }



});