$(document).ready(function() {
    function toggleClassAndShow(element, className, showElement) {
        element.toggleClass(className);
        showElement.toggle();
    }

    function updateButtonCount() {
        $('#ttt').html($(".closeinput").length);
    }

    function createRemoveLink(elem) {
        return $("<span/>", { class: "closeinput" }).html("X").click(function() {
            var index = $(this).index('.closeinput');
            $('.test .kawaii-button.button-added').eq(index).remove();
            elem.remove();
            $(this).remove();
            updateButtonCount();
        });
    }

    $(".title").click(() => $("#myModal2").show());

    $(".clear-input").click(function() {
        $(this).siblings('input, textarea').val('').keyup();
    });

    $("#style-setting span").click(function() {
        $(this).addClass('active').siblings('span').removeClass();
        $('.test > div > div').removeClass().addClass('kawaii-window ' + $(this).attr('id'));
        $("#control-min-toggle").toggle($(this).attr('id') !== "kawaii-e");
    });

    $(".color-settings span").hover(function() {
        $(this).addClass('active').siblings('span').removeClass();
    }).click(function() {
        $('body').removeClass().addClass($(this).attr('id'));
    });

    $("#control-min-toggle").click(function() {
        toggleClassAndShow($(this), "active not-active", $("#control-min"));
    });

    $("#control-x-toggle").click(function() {
        toggleClassAndShow($(this), "active not-active", $("#control-x"));
    });

    $("#donate-toggle").click(function() {
        toggleClassAndShow($(this), "active not-active", $("#donate"));
        $("#report").hide();
    });

    $("#report-toggle").click(function() {
        toggleClassAndShow($(this), "active not-active", $("#report"));
        $("#donate").hide();
    });

    $("#click-toggle-menu").click(function() {
        $("#click-toggle-menu i").toggleClass("fa-chevron-right fa-chevron-left");
        $("#menu-container").toggle("slow");
    });

    $('#lights').click(function() {
        $('.test').toggleClass("lights-on lights-off");
        $(this).toggleClass("active a");
    });

    const inputs = [
        { value: "Yes" },
        { value: "No" }
    ];

    inputs.forEach(input => {
        const elem = $("<input/>", { type: "text", name: "teamName[]", value: input.value });
        const removeLink = createRemoveLink(elem);
        $("#inputs").append(elem).append(removeLink);
    });

    updateButtonCount();

    $("#addNewButton").click(function() {
        const btn = [
            "I'm cute.", "Nope!", "WHAAAT", "OKKAAAY", "Nuh-uh", "HAI!", "Sowwy", "nOOoOoOooO",
            "I'm cool.", "Hecc nooo", "No no no no", "YES YES YES", "YAAASS", "sate sate sate",
            "Dame desu yo", "Nani?", "Huh?", "Hai hai", "Iie", "Yare yare", "Yosh yosh", "Yare yare daze",
        ];
        const randBtn = btn[Math.floor(Math.random() * btn.length)];
        const elem = $("<input/>", { type: "text", name: "teamName[]", value: randBtn });
        const removeLink = createRemoveLink(elem);
        $('.test .kawaii-button-box').append('<button class="kawaii-button button-added">' + randBtn + '</button>');
        $("#inputs").append(elem).append(removeLink);
        updateButtonCount();
    });

    $("#inputs").on("keyup", "input", function() {
        const btnVal = $(this).val();
        const index = $(this).index('#inputs input');
        $('.test .kawaii-button').eq(index).text(btnVal);
    });

    $("#window-input").on("keyup", function() {
        $('#window-title').text($(this).val());
    });

    $("#heading-input").on("keyup", function() {
        $('#heading').text($(this).val());
    });

    $("#msg-input").on("keyup", function() {
        $('.message-content').text($(this).val());
    });

    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("loader1").style.display = "block";
        document.getElementById('generated-image').innerHTML = '';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("loader1").style.display = "block";
        }
    };

    const audio = new Audio("StillAwakeLofiStudyMusic.mp3");
    audio.loop = true;

    $("#playBtn").click(function() {
        audio.play();
        $("#pauseBtn").show();
        $('#playBtn').hide();
    });

    $("#pauseBtn").click(function() {
        audio.pause();
        $("#playBtn").show();
        $('#pauseBtn').hide();
    });

    $("#stopBtn").click(function() {
        audio.pause();
        audio.currentTime = 0;
        $("#playBtn").show();
        $('#pauseBtn').hide();
    });

    $("#music-option").hover(function() {
        $("#music-controls").slideToggle();
        $("#share-controls").slideUp();
    });

    $("#share-option").hover(function() {
        $("#share-controls").slideToggle();
        $("#music-controls").slideUp();
    });

    function generateImage(node, param, format, extension) {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";

        domtoimage[`to${format}`](node, param)
            .then(function(dataUrl) {
                const img = new Image();
                img.src = dataUrl;
                document.getElementById('generated-image').innerHTML = '';
                setTimeout(() => $('#loader1').fadeOut('fast'), 1000);
                setTimeout(() => document.getElementById('generated-image').appendChild(img), 1000);

                const link = document.createElement('a');
                link.download = `kawaii-window.${extension}`;
                link.href = dataUrl;
                link.innerText = `Download ${extension.toUpperCase()}`;
                setTimeout(() => document.getElementById('generated-image').appendChild(link), 1000);
            })
            .catch(error => console.error('oops, something went wrong!', error));
    }

    $("#amazingbtn").click(function() {
        const node = document.getElementById('kawaii-window-save');
        const param = {
            height: node.offsetHeight * 3,
            width: node.offsetWidth * 3,
            quality: 1,
            style: {
                transform: 'scale(3)',
                transformOrigin: 'top left',
                width: node.offsetWidth + "px",
                height: node.offsetHeight + "px"
            }
        };
        generateImage(node, param, 'Png', 'png');
    });

    $("#amazingbtn2").click(function() {
        const node = document.getElementById('kawaii-window-save');
        const param = {
            height: node.offsetHeight * 3,
            width: node.offsetWidth * 3,
            quality: 1,
            style: {
                transform: 'scale(3)',
                transformOrigin: 'top left',
                width: node.offsetWidth + "px",
                height: node.offsetHeight + "px"
            },
            filter: node => node.tagName !== 'i'
        };
        generateImage(node, param, 'Svg', 'svg');
    });
});
