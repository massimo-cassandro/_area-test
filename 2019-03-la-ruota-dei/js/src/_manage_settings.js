/* globals RUOTA:true */

RUOTA = (wheel => {
  "use strict";

  wheel.store_settings = function () {

    let settings = {};

    settings.form = {};

    document.querySelectorAll('#settings input').forEach( item => {


      if(item.type === 'radio' || item.type === 'checkbox') {
        settings.form[item.id] = item.checked;
      } else {
        settings.form[item.id] = item.value;
      }
    });

    settings.cliparts = [];

    wheel.cliparts_selected_wrapper.querySelectorAll('.clipart-selected').forEach(item => {
      let clipart_text = item.querySelector('.clipart-text input').value;
      item.dataset.nome = clipart_text;
      settings.cliparts.push(item.dataset);
    });
    localStorage.setItem(wheel.storage_var, JSON.stringify(settings));
  };


  // retrieve settings
  let settings = localStorage.getItem(wheel.storage_var);

  if(settings) {
    settings = JSON.parse(settings);
    if(settings.form !== undefined && settings.cliparts !== undefined) {
      for(let i in settings.form) {

        let form_el = document.getElementById(i);

        if(form_el.type === 'radio' || form_el.type === 'checkbox') {
          form_el.checked = settings.form[i];
        } else {
          form_el.value = settings.form[i];
        }
      }

      settings.cliparts.forEach(item => {
        wheel.add_selected_clipart(item);
      });

      wheel.addClipsToDisk();
    }

  }

  return wheel;

})(RUOTA || {});
