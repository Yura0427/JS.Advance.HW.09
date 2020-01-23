$(function () {
    const name = /^[A-Za-z]{2,20}$/;
    const email = /^[A-Za-z0-9-.]{1,}@[a-z]{1,}\.[a-z]{2,}$/;
    const pass = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[A-Za-z0-9]{8,15}$/;
    $('#name, #sname').on('input', function () {
        if (name.test($(this).val())) {
            $($(this).next().next()).text('V');
            $($(this).next().next()).css({
                color: 'rgb(0, 0, 255)',
                opacity: .9,
            });
        } else {
            $($(this).next().next()).text('X');
            $($(this).next().next()).css({
                color: 'rgb(255, 0, 0)',
                opacity: .9,
            });
        }
    });
    $('#email, #email2').on('input', function () {
        if (email.test($(this).val())) {
            $($(this).next().next()).text('V');
            $($(this).next().next()).css({
                color: 'rgb(0, 0, 255)',
                opacity: .9,
            });
        } else {
            $($(this).next().next()).text('X');
            $($(this).next().next()).css({
                color: 'rgb(255, 0, 0)',
                opacity: .9,
            });
        }
    });
    $('#pass, #pass2').on('input', function () {
        if (pass.test($(this).val())) {
            $($(this).next().next()).text('V');
            $($(this).next().next()).css({
                color: 'rgb(0, 0, 255)',
                opacity: .9,
            });
        } else {
            $($(this).next().next()).text('X');
            $($(this).next().next()).css({
                color: 'rgb(255, 0, 0)',
                opacity: .9,
            });
        }
    });
    $('input[id]').on('focus', function () {
        $(this).next().css({
            top: -15,
            fontSize: 15
        })
    });
    $('input[id]').on('blur', function () {
        if ($(this).val() == '') $(this).next().css({
            top: +15,
            fontSize: 18
        })
        for (let i = 0; i < 4; i++) {
            if ($($('label:last-of-type')[i]).text() == 'X' || $($('label:last-of-type')[i]).text() == '') {
                return $($('input[type="button"]')[0]).attr('disabled', true);
            } else $($('input[type="button"]')[0]).attr('disabled', false);
        }
    });
    $("p:contains('Sign In now')").click(function () {
        $('form[name="f1"]').css('display', 'none');
        $('form[name="f2"]').css('display', 'block');
    });
    $("p:contains('Sign Up now')").click(function () {
        $('form[name="f1"]').css('display', 'block');
        $('form[name="f2"]').css('display', 'none');
    });
    class User {
        constructor(n, s, e, p) {
            this.name = n;
            this.sname = s;
            this.email = e;
            this.pass = p;
        }
    };
    function push(user) {
        localStorage.setItem(`user${localStorage.length+1}`, JSON.stringify(user));
        $('label:last-of-type').text('');
        $($('input[type="button"]')[0]).attr('disabled', true);
        $('form[name="f1"]')[0].reset();
    }
    $('input[type="button"][value="Sign Up"]').click(function () {
        let [name, sname, email, pass] = [$('#name').val(), $('#sname').val(), $('#email').val(), $('#pass').val()];
        let user = new User(name, sname, email, pass);
        if (localStorage.length != 0) {
            let arr = [];
            for (let i = 0; i < localStorage.length; i++) {
                arr[i] = JSON.parse(localStorage.getItem(`user${i+1}`)).email
            }
            if (arr.includes(email)) {
                alert('email already exist');
            } else {
                push(user);
            }

        } else {
            push(user);
        }
    });
    $('input[type="button"][value="Sign In"]').click(function () {
        if (localStorage.length != 0) {
            let [email, pass] = [$('#email2').val(), $('#pass2').val()];
            let arr = [];
            for (let i = 0; i < localStorage.length; i++) {
                arr[i] = JSON.parse(localStorage.getItem(`user${i+1}`));
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].email == email && arr[i].pass == pass) {
                    $('output[name="Name"]').text(`${arr[i].name} ${arr[i].sname}`);
                    $('output[name="Email"]').text(`${arr[i].email}`);
                    $('form[name="f2"]').css('display', 'none');
                    $('form[name="f3"]').css('display', 'block');
                    $('label:last-of-type').text('');
                    $('form[name="f2"]')[0].reset();
                    break;
                }
                if(i==arr.length-1){
                    alert('incorrect email or password')
                }
            }
        } else {
            alert('localStorage empty')
        }
    });
    $('input[type="button"][value="Sign Out"]').click(function () {
        $('form[name="f2"]').css('display', 'block');
        $('form[name="f3"]').css('display', 'none');
    });
});