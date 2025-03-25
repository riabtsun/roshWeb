
window.addEventListener('DOMContentLoaded', (event) => {

  const sidebarWrapper = document.getElementById('sidebar-wrapper');
  let scrollToTopVisible = false;
  // Closes the sidebar menu
  const menuToggle = document.body.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', event => {
    event.preventDefault();
    sidebarWrapper.classList.toggle('active');
    menuToggle.classList.toggle('active');
  })

  // Closes responsive menu when a scroll trigger link is clicked
  let scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
  scrollTriggerList.map(scrollTrigger => {
    scrollTrigger.addEventListener('click', () => {
      sidebarWrapper.classList.remove('active');
      menuToggle.classList.remove('active');
    })
  });


  // Scroll to top button appear
  document.addEventListener('scroll', () => {
    const scrollToTop = document.body.querySelector('.scroll-to-top');
    console.log(document.documentElement.scrollTop)
    if (document.documentElement.scrollTop > 100) {
      if (!scrollToTopVisible) {
        fadeIn(scrollToTop);
        scrollToTopVisible = true;
      }
    } else {
      if (scrollToTopVisible) {
        fadeOut(scrollToTop);
        scrollToTopVisible = false;
      }
    }
  })
})

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

// $(document).ready(function() {
//   console.log('Ajax');
//
//   Inputmask({"mask": "(999) 999-99-99"}).mask("#FormControlVIK");
//   Inputmask({"mask": "(999) 999-99-99"}).mask("#FormControlVIK2");
//   Inputmask({"mask": "99/99/9999", alias: "dd-mm-yyyy", placeholder: 'дд/мм/рррр'}).mask("#FormControlEDGE");
//   Inputmask({regex: "[fmstwqzrd]{2}\-[0-9]{4}", placeholder: 'хх-хххх'}).mask("#FormControlCARDCOD");
//
//   $(document).on("submit", "form[name=register], form[name=restore], form[name=pharma]", function(e) {
//     e.preventDefault();
//
//     $.ajax({
//       type: $(this).attr("method"),
//       url: $(this).attr("action"),
//       cache: false,
//       //contentType: '',
//       dataType: 'json',
//       data: $(this).serialize(), // serializes the form's elements.
//       success: function(data)
//       {
//         console.log(data); // show response from the php script.
//         $("div.modal").modal('hide');
//         $("#exampleModal .modal-title").html(data.title);
//         $("#exampleModal .modal-body p").html(data.text);
//         $("#exampleModal").modal('show');
//         if(data.error == false) {
//           $("form[name=register]")[0].reset();
//           $("form[name=restore]")[0].reset();
//           $("form[name=pharma]")[0].reset();
//           $("select#FormControlPREPARAT").trigger('change');
//           $("select#FormControlGEODATA_REGION").trigger('change');
//         }
//       }
//     });
//
//   });
//
//   $("select#FormControlTESTER").chained("select#FormControlPREPARAT");
//
//   $("select#FormControlPREPARAT").change(function(){
//     if($(this).val()=='default') {
//       $("input[name=product]").val('');
//     } else {
//       $("input[name=product]").val($(this).find(":selected").text());
//     }
//
//   })
//   $("select#FormControlTESTER").change(function(){
//     var t = $(this).find(":selected").text();
//     var v = $(this).find(":selected").val();
//     if(t == 'Інше') {
//       $("textarea[name=diagnosis]").text('').show();
//     } else {
//       if(v == 0) {
//         $("textarea[name=diagnosis]").hide().text('');
//       } else {
//         $("textarea[name=diagnosis]").hide().text(t);
//       }
//     }
//   });
//   $("select#FormControlTESTER").trigger("change");
//   $("select#FormControlPREPARAT").trigger("change");
//
//   $("select#FormControlGEODATA").chained("select#FormControlGEODATA_REGION");
//
//   $("select#FormControlGEODATA_REGION").change(function(){
//     $("input[name=region]").val($(this).find(":selected").text());
//   });
//
//   $("select#FormControlGEODATA").change(function(){
//     var t = $(this).find(":selected").text();
//     if(t == 'Інше') {
//       $("textarea[name=city_text]").text('').show();
//     } else {
//       $("textarea[name=city_text]").hide().text('');
//     }
//   });
//
//   $("#productModal button.btn-primary").click(function(){
//     //$("body").scrollTop(500)
//     //https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
//     xCoord=yCoord=0;
//     window.scrollTo(xCoord, yCoord);
//   });
//   $("#productModal button.btn-secondary").click(function(){
//     $("#productModal, div.blur").remove();
//   })
// });
