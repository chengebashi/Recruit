function preview(input) {

        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            if (e.target.result.indexOf('jpeg') != -1 || e.target.result.indexOf('png') != -1 || e.target.result.indexOf('gif') != -1) {
              $('#img').attr('src', e.target.result);
              $("#fig").css('display','block');
              $('#sendimg').css('display','block');
              $('svg').css({'display': 'none'});
            } else {
              document.getElementById('dialog-default').showModal();
              $('svg').css({'display': 'block'});
              $('#img').attr('src', '');
            }
          }
          reader.readAsDataURL(input.files[0]);
        }
      }

      $("#upload").change(function () {
        $("#img").css({top: 0, left: 0});
        $('svg').css({'display': 'none'});
        preview(this);
        $("#img").draggable({containment: 'parent', scroll: false});
      });