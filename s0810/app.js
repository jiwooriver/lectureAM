window.onload = function () {
    let current = 0;
    let isSlide = false;
    const len = $(".slide-image").length;
    let frame;

    function slide(target, dir) {
        if (target >= len || target < 0 || isSlide || target === current) return;

        console.log(target, dir);

        isSlide = true;

        clearInterval(frame);
        frame = setInterval(clickBtn, 5000);

        $(".slide-image")
            .eq(target)
            .css({ "left": `${dir * 100}%` })
            .animate({ "left": 0 }, 800);

        $(".slide-image")
            .eq(current)
            .animate({ "left": `${-100 * dir}%` }, 800, function () {
                isSlide = false;
            });
        current = target;
        $(".pin").removeClass("active");
        $(".pin").eq(target).addClass("active");
    }

    function clickBtn() {
        $('#right-btn').click();
    }

    $(".slide-image").css({ "left": "100%" });
    $(".slide-image").eq(current).css("left", 0);

    $(".pin").on("click", function () {
        let idx = $(this).index();
        slide(idx, idx - current < 0 ? -1 : 1);

        $(".pin").removeClass("active");
        $(".pin").eq(idx).addClass("active");
    });

    $(".slide-btn").on("click", function () {
        let dir = $(this).data("dir") * 1;
        let target = current + dir;
        if (target < 0) target = len - 1;
        if (target > len - 1) target = 0;
        console.log(target);
        slide(target, dir);
    });

    frame = setInterval(clickBtn, 5000)
};