
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

$(document).ready(function() {
  console.log('Ajax');

  Inputmask({"mask": "(999) 999-99-99"}).mask("#FormControlVIK");
  Inputmask({"mask": "(999) 999-99-99"}).mask("#FormControlVIK2");
  Inputmask({"mask": "99/99/9999", alias: "dd-mm-yyyy", placeholder: 'дд/мм/рррр'}).mask("#FormControlEDGE");
  Inputmask({regex: "[fmstwqzrd]{2}\-[0-9]{4}", placeholder: 'хх-хххх'}).mask("#FormControlCARDCOD");

  $(document).on("submit", "form[name=register], form[name=restore], form[name=pharma]", function(e) {
    e.preventDefault();

    $.ajax({
      type: $(this).attr("method"),
      url: $(this).attr("action"),
      cache: false,
      //contentType: '',
      dataType: 'json',
      data: $(this).serialize(), // serializes the form's elements.
      success: function(data)
      {
        console.log(data); // show response from the php script.
        $("div.modal").modal('hide');
        $("#exampleModal .modal-title").html(data.title);
        $("#exampleModal .modal-body p").html(data.text);
        $("#exampleModal").modal('show');
        if(data.error == false) {
          $("form[name=register]")[0].reset();
          $("form[name=restore]")[0].reset();
          $("form[name=pharma]")[0].reset();
          $("select#FormControlPREPARAT").trigger('change');
          $("select#FormControlGEODATA_REGION").trigger('change');
        }
      }
    });

  });

  $("select#FormControlTESTER").chained("select#FormControlPREPARAT");

  $("select#FormControlPREPARAT").change(function(){
    if($(this).val()=='default') {
      $("input[name=product]").val('');
    } else {
      $("input[name=product]").val($(this).find(":selected").text());
    }

  })
  $("select#FormControlTESTER").change(function(){
    var t = $(this).find(":selected").text();
    var v = $(this).find(":selected").val();
    if(t == 'Інше') {
      $("textarea[name=diagnosis]").text('').show();
    } else {
      if(v == 0) {
        $("textarea[name=diagnosis]").hide().text('');
      } else {
        $("textarea[name=diagnosis]").hide().text(t);
      }
    }
  });
  $("select#FormControlTESTER").trigger("change");
  $("select#FormControlPREPARAT").trigger("change");

  $("select#FormControlGEODATA").chained("select#FormControlGEODATA_REGION");

  $("select#FormControlGEODATA_REGION").change(function(){
    $("input[name=region]").val($(this).find(":selected").text());
  });

  $("select#FormControlGEODATA").change(function(){
    var t = $(this).find(":selected").text();
    if(t == 'Інше') {
      $("textarea[name=city_text]").text('').show();
    } else {
      $("textarea[name=city_text]").hide().text('');
    }
  });

  $("#productModal button.btn-primary").click(function(){
    //$("body").scrollTop(500)
    //https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
    xCoord=yCoord=0;
    window.scrollTo(xCoord, yCoord);
  });
  $("#productModal button.btn-secondary").click(function(){
    $("#productModal, div.blur").remove();
  })
});

$(document).ready(function() {

  const isNumericInput = (event) => {
      const key = event.keyCode;
      return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105)// Allow number pad
      );
    }
  ;

  const isModifierKey = (event) => {
      const key = event.keyCode;
      return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (// Allow Ctrl/Command + A,C,V,X,Z
          (event.ctrlKey === true || event.metaKey === true) && (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
    }
  ;

  const enforceFormat = (event) => {
      // Input must be of a valid number format or a modifier key, and not longer than ten digits
      if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
      }
    }
  ;

  const formatToPhone = (event) => {
      if (isModifierKey(event)) {
        return;
      }

      // I am lazy and don't like to type things more than once
      const target = event.target;
      const input = event.target.value.replace(/\D/g, '').substring(0, 10);
      // First ten digits of input only
      const zip = input.substring(0, 3);
      const middle = input.substring(3, 6);
      const last = input.substring(6, 8);
      const last2 = input.substring(8, 10);

      /*
Киевстар: 039, 067, 068, 096, 097, 098
Водафон (МТС): 050, 066, 095, 099
Lifecell (Лайф): 063, 093, 073
Utel: 091
PEOPLEnet: 092
Интертелеком: 094
*/

      if (input.length > 3) {
        console.log(zip)
        if (zip != '039' && zip != '067' && zip != '068' && zip != '096' && zip != '097' && zip != '098' && zip != '050' && zip != '063' && zip != '066' && zip != '073' && //add 17.10.2022
          zip != '095' && zip != '099' && zip != '091' && zip != '092' && zip != '093' && zip != '094') {
          target.value = '';
          return false;
        }
      }

      if (input.length > 6) {
        target.value = `(${zip}) ${middle}-${last}-${last2}`;

      } else if (input.length > 3) {
        target.value = `(${zip}) ${middle}`;
      } else if (input.length > 0) {
        target.value = `(${zip}`;
      }
    }
  ;

  const inputElement = document.getElementById('FormControlVIK');
  if (inputElement) {
    inputElement.addEventListener('keydown', enforceFormat);
    inputElement.addEventListener('keyup', formatToPhone);
  }
});
