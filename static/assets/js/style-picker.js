 
'use strict'
$(document).ready(function () {
    /* get cookie and set classes */

    /* wrapper corner */
    if ($.type($.cookie("wrappercorner")) != 'undefined' && $.cookie("wrappercorner") != '') {
        $('#wrapperCorner').prop('checked', true);
        $('body').addClass($.cookie("wrappercorner"));
    } else {
        $('#wrapperCorner').prop('checked', false);
        $('body').removeClass($.cookie("wrappercorner"));
    }

    /* content width */
    if ($.type($.cookie("contentWidth")) != 'undefined' && $.cookie("contentWidth") != '') {
        $('#contentWidth').prop('checked', true);
        $('#main-container').addClass($.cookie("contentWidth")).removeClass('container');
    } else {
        $('#contentWidth').prop('checked', false);
        $('#main-container').removeClass($.cookie("contentWidth")).addClass('container');
    }

    /* header fixed postion  */
    if ($.type($.cookie("headerfixed")) != 'undefined' && $.cookie("headerfixed") != '') {
        $('#headerfixed').prop('checked', true);
        $('body').addClass('header-fixed-top');
        $('.header-container').addClass('shadow-sm');
        if ($('body').hasClass('wrapper-square') == true) {
            var headerheight = $('.header-container').outerHeight();
            $('.wrapper').css('padding-top', headerheight);
        } else {
            var headerheight = $('.header-container').outerHeight() + 15;
            $('.wrapper').css('padding-top', headerheight);
        }
    } else {
        $('#headerfixed').prop('checked', false);
        $('body').removeClass('header-fixed-top');
        $('.header-container').removeClass('shadow-sm');
        if ($('body').hasClass('wrapper-square') == true) {
            $('.wrapper').css('padding-top', '0');
        } else {
            $('.wrapper').css('padding-top', '15px');
        }
    }

    /* header fixed container  */
    if ($.type($.cookie("headercontainer")) != 'undefined' && $.cookie("headercontainer") != '') {
        $('#headercontainer').prop('checked', true);
        $('#header-container').addClass('container').removeClass('container-fluid');
        $('#submenu-container').addClass('container').removeClass('container-fluid');
    } else {
        $('#headercontainer').prop('checked', false);
        $('#header-container').removeClass('container').addClass('container-fluid');
        $('#submenu-container').removeClass('container').addClass('container-fluid');
    }


    /* header fill color  */
    if ($.type($.cookie("headerfillcolor")) != 'undefined' && $.cookie("headerfillcolor") != '') {
        $('#headerfillcolor').prop('checked', true);
        $('body').addClass($.cookie("headerfillcolor"));
    } else {
        $('#headerfillcolor').prop('checked', false);
        $('body').removeClass($.cookie("headerfillcolor"));
    }


    /* sidebar fill color  */
    if ($.type($.cookie("sidebarFill")) != 'undefined' && $.cookie("sidebarFill") != '') {
        $('#sidebarFill').prop('checked', true);
        $('body').addClass($.cookie("sidebarFill"));
    } else {
        $('#sidebarFill').prop('checked', false);
        $('body').removeClass($.cookie("sidebarFill"));
    }


    /* sidebar size */
    if ($.type($.cookie("sidebarsize")) != 'undefined' && $.cookie("sidebarsize") != '') {
        if ($.cookie("sidebarsize") == 'sidebar-compact') {
            $('#sidebarCompact').prop('checked', true);
            $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
        } else if ($.cookie("sidebarsize") == 'sidebar-icon') {
            $('#sidebarIconic').prop('checked', true);
            $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
        } else {
            $('#sidebarfull').prop('checked', true);
        }
        $('body').addClass($.cookie("sidebarsize"));
    } else {
        $('#sidebarfull').prop('checked', true);
        $('body').removeClass('sidebar-compact sidebar-icon');
    }

    /* Moderntouch specious  */
    if ($.type($.cookie("moderntouch")) != 'undefined' && $.cookie("moderntouch") != '') {
        $('#moderntouch').prop('checked', true);
        $('body').addClass($.cookie("moderntouch"));
        if ($('body').hasClass('header-fixed-top') == true) {
            var headerheight = $('.header-container').outerHeight() + 15;
            $('.wrapper').css('padding-top', headerheight);
        }
    } else {
        $('#moderntouch').prop('checked', false);
        $('body').removeClass($.cookie("moderntouch"));
        if ($('body').hasClass('header-fixed-top') == true) {
            var headerheight = $('.header-container').outerHeight() + 15;
            $('.wrapper').css('padding-top', headerheight);
        } else if ($('body').hasClass('wrapper-square') == true) {
            $('.wrapper').css('padding-top', '0');
        } else {
            $('.wrapper').css('padding-top', '15px');
        }
    }

    /* Full screen */
    if ($.type($.cookie("fullscreen")) != 'undefined' && $.cookie("fullscreen") != '') {
        $('#fullscreen').prop('checked', true);
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        $('#fullscreen').prop('checked', false);        
    }

    /* Font size */
    if ($.type($.cookie("fontsize")) != 'undefined' && $.cookie("fontsize") != '') {
        if ($.cookie("fontsize") == '13px') {
            $('#xsmallfs').prop('checked', true);
            $('body').css('font-size', '13px');
        } else if ($.cookie("fontsize") == '14px') {
            $('#smallfs').prop('checked', true);
            $('body').css('font-size', '14px');
        } else if ($.cookie("fontsize") == '15px') {
            $('#mediumfs').prop('checked', true);
            $('body').css('font-size', '15px');
        } else if ($.cookie("fontsize") == '16px') {
            $('#largefs').prop('checked', true);
            $('body').css('font-size', '16px');
        }
    } else {
        $('#smallfs').prop('checked', true);
        $('body').css('font-size', '14px');
    }

    /* style selected color scheme */
    if ($.type($.cookie("styleselected")) != 'undefined' && $.cookie("styleselected") != '') {
        var currentstyle = $('#stylelink');
        $('head').append('<link href="../../static/assets/css/' + $.cookie("styleselected") + '.css" rel="stylesheet" id="stylelink">');
        setTimeout(function () {
            currentstyle.remove();
        }, 200);

    } else {
        $('head').append('<link href="../../static/assets/css/bootstrap.css" rel="stylesheet" id="stylelink2"><link href="../../static/assets/css/style-darkblue-dark.css" rel="stylesheet" id="stylelink">');
    }


    /* select checkbox personalize change events */


    /* wrapper corner */
    $('#wrapperCorner').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("wrappercorner", 'wrapper-square', {
                expires: 7
            });

            $('body').addClass('wrapper-square');
            if ($('body').hasClass('header-fixed-top') == true) {
                var headerheight = $('.header-container').outerHeight();
                $('.wrapper').css('padding-top', headerheight);
            } else {
                $('.wrapper').css('padding-top', '0');
            }
        } else {
            $.removeCookie("wrappercorner", '');

            $('body').removeClass('wrapper-square');
            if ($('body').hasClass('header-fixed-top') == true) {
                var headerheight = $('.header-container').outerHeight() + 15;
                $('.wrapper').css('padding-top', headerheight);
            } else {
                $('.wrapper').css('padding-top', '15px');
            }
        }
    });


    /* container width */
    $('#contentWidth').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("contentWidth", 'container-fluid', {
                expires: 7
            });

            $('#main-container').addClass('container-fluid').removeClass('container');
        } else {
            $.removeCookie("contentWidth");
            $('#main-container').removeClass('container-fluid').addClass('container');
        }
    });

    /* header fixed position */
    $('#headerfixed').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("headerfixed", 'header-fixed-top', {
                expires: 7
            });
            $('body').addClass('header-fixed-top');
            $('.header-container').addClass('shadow-sm');

            if ($('body').hasClass('wrapper-square') == true) {
                var headerheight = $('.header-container').outerHeight();
                $('.wrapper').css('padding-top', headerheight);
            } else {
                var headerheight = $('.header-container').outerHeight() + 15;
                $('.wrapper').css('padding-top', headerheight);
            }
        } else {
            $.removeCookie("headerfixed");
            $('body').removeClass('header-fixed-top');
            $('.header-container').removeClass('shadow-sm');
            if ($('body').hasClass('wrapper-square') == true) {
                $('.wrapper').css('padding-top', '0');
            } else {
                $('.wrapper').css('padding-top', '15px');
            }
        }
    });

    /* header fixed width  */
    $('#headercontainer').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("headercontainer", 'container', {
                expires: 7
            });
            $('#header-container').addClass('container').removeClass('container-fluid');
            $('#submenu-container').addClass('container').removeClass('container-fluid');
        } else {
            $.removeCookie("headercontainer");
            $('#header-container').removeClass('container').addClass('container-fluid');
            $('#submenu-container').removeClass('container').addClass('container-fluid');
        }
    });


    /* header fill color */
    $('#headerfillcolor').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("headerfillcolor", 'header-fill', {
                expires: 7
            });
            $('body').addClass('header-fill');
        } else {
            $.removeCookie("headerfillcolor");
            $('body').removeClass('header-fill');
        }
    });



    /* sidebar compact */
    $('#sidebarCompact').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("sidebarsize", 'sidebar-compact', {
                expires: 7
            });
            $('body').addClass('sidebar-compact');
            $('body').removeClass('sidebar-icon');
            $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
        } else {
            $.removeCookie("sidebarsize");
            $('body').removeClass('sidebar-compact');
        }
    });

    /* sidebar icon */
    $('#sidebarIconic').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("sidebarsize", 'sidebar-icon', {
                expires: 7
            });
            $('body').addClass('sidebar-icon');
            $('body').removeClass('sidebar-compact');
            $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
        } else {
            $.removeCookie("sidebarsize");
            $('body').removeClass('sidebar-icon');
        }
    });

    /* sidebar full */
    $('#sidebarfull').on('click', function () {
        if ($(this).is(':checked')) {
            $.removeCookie("sidebarsize");
            $('body').removeClass('sidebar-icon');
            $('body').removeClass('sidebar-compact');
        }
    });

    /* sidebar fill color */
    $('#sidebarFill').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("sidebarFill", 'sidebar-fill', {
                expires: 7
            });
            $('body').addClass('sidebar-fill');
        } else {
            $.removeCookie("sidebarFill");
            $('body').removeClass('sidebar-fill');
        }
    });



    /* more specious */
    $('#moderntouch').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("moderntouch", 'modern-touch', {
                expires: 7
            });
            $('body').addClass('modern-touch');
            if ($('body').hasClass('header-fixed-top') == true) {
                var headerheight = $('.header-container').outerHeight() + 15;
                $('.wrapper').css('padding-top', headerheight);
            }


        } else {
            $.removeCookie("moderntouch");
            $('body').removeClass('modern-touch');
            if ($('body').hasClass('header-fixed-top') == true) {
                var headerheight = $('.header-container').outerHeight() + 15;
                $('.wrapper').css('padding-top', headerheight);
            } else if ($('body').hasClass('wrapper-square') == true) {
                $('.wrapper').css('padding-top', '0');
            } else {
                $('.wrapper').css('padding-top', '15px');
            }
        }
    });

    $('#fullscreen').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("fullscreen", 'fullscreen', {
                expires: 7
            });
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            //document.documentElement.webkitRequestFullScreen(); // on
        } else {
            $.removeCookie("fullscreen");
            if (document.documentElement.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.documentElement.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.documentElement.webkitExitFullscreen) {                
                document.webkitCancelFullScreen();
            } else if (document.documentElement.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });

    /* fontsize*/
    $('#xsmallfs').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("fontsize", '13px', {
                expires: 7
            });
            $('body').css('font-size', '13px');
        }
    });
    $('#smallfs').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("fontsize", '14px', {
                expires: 7
            });
            $('body').css('font-size', '14px');
        }
    });
    $('#mediumfs').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("fontsize", '15px', {
                expires: 7
            });
            $('body').css('font-size', '15px');
        }
    });
    $('#largefs').on('click', function () {
        if ($(this).is(':checked')) {
            $.cookie("fontsize", '16px', {
                expires: 7
            });
            $('body').css('font-size', '16px');
        }
    });


    /* style color  */
    $('.style-picker').on('click', function () {
        $('.loader').fadeIn();
        $('.style-picker').removeClass('active')
        $(this).addClass('active')
        var currentstyle = $('#stylelink');
        var applystyle = $(this).attr('data-target');
        $('#stylelink').replaceWith('<link href="../../static/assets/css/' + applystyle + '.css" rel="stylesheet" id="stylelink">');
        setTimeout(function () {
            currentstyle.remove();
            $('.loader').fadeOut('slow');
        }, 1800)

        $.cookie("styleselected", applystyle, {
            expires: 7
        });
    });


});
