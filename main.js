



let results = [];
let myLeads=[];
let listItems='Some item';
let body = document.querySelector("body");

let box=document.getElementById("box");
let test = document.querySelector(".test") 
let header_test = document.querySelector(".header__test")
let body_test = document.querySelector(".body__test")
const btn=document.getElementById("input-btn");
const dbtn=document.getElementById("input-delete");

const inputEl=document.getElementById("input-el")
const nomen=document.getElementById("gritt")
const lis=document.getElementById("saves")
const ms=document.getElementById("mess");

const vv= JSON.parse(localStorage.getItem("myLids"))
const tabBtn=document.getElementById("tab-btn");



const add_butt = document.getElementById('add');
const delete_butt = document.getElementById('delete');
const abort_butt = document.getElementById('abort');
const modify_butt = document.getElementById('modify');
const upd_butt = document.getElementById('upload');
const cancel_butt = document.querySelector('#cancel_t')
const input_el_name = document.getElementById("input-el_name");
const input_el_body = document.getElementById("input-el_body");
const extended = document.getElementById("extended");
let Ss_C = document.querySelector("#SS_C");
let Ss_C__upload = document.querySelector("#SS_C__upload");
const fake_grid = document.querySelector(".Fake_grid")
edit_span = document.querySelector("#modify_text_Edit")
hide_butt = document.querySelector(".hide_icon")
let bool_edited=4;
const upd_t = document.querySelector('#upload_t')
const header_tmpl = document.querySelector(".cell-row-header"); 
const menu_bar = document.querySelector(".menu_bar"); 
const main_container = document.querySelector(".main_container"); 
const main_form = document.querySelector(".content"); 
const add_tmpl_ico = document.querySelector(".add_tmpl_button");
const settings_color_ico = document.querySelector(".settings_color_ico"); 
const close_tmpl_ico = document.querySelector(".close_span");
const input_el__menu_bar = document.querySelector("#input-el__menu_bar");
const list_search = document.querySelector("#ul__list__ext");
const bold_btn = document.querySelector('#bold_btn__redactor');
const italic_btn = document.querySelector('#italic_btn__redactor');
const underline_btn = document.querySelector('#underline_btn__redactor');
const sthrough_btn = document.querySelector("#strikethrough_btn_redactor");
const olList_btn = document.querySelector('#olList_btn__redactor');
const ulList_btn = document.querySelector('#ulist_btn__redactor');
const color_btn = document.querySelector('#color_btn__redactor');
const extraF = document.querySelector(".extraF");
const editMenu = document.querySelector(".test110");
const color_container = document.querySelector(".colors_container")
const color_section = document.querySelector(".colors_section")
const cust_color = document.querySelector('#custom');
const redactor_container = document.querySelector('.txt_redactor__container')
const settings_color =  document.querySelector('.settings-icon')
const edit_container = document.querySelector("#edit_mode");
const save_editColorbtn = document.querySelector('#save_edit__color')
const cancel_editColorbtn = document.querySelector('#cancel_edit__color')
const download_btn  = document.querySelector('#download_t');
const drop_down_upload = document.querySelector('.svg-container');
const drop_down_download = document.querySelector('.svg-container2');
let custom_colors = [];
const xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const xls = "application/vnd.ms-excel";
const csv = "text/csv";
const doc = "application/msword";
const docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const txt = "text/plain";
const json = "application/json"
let b = document.querySelectorAll('[data-index]');
const custom_menu = document.getElementById("contextMenu"); 
let edit_mode=0;
let index = 0;
let res = [];
let del_el_13 = [];
let del_el_12 = [];
let del_el_11 = [];
let index_c;
let duplicates = [];
let tmpl11 = [];
let tmpl12 = [];
let tmpl13 = [];
let col_edit_dataset = [];
 

const new_tmpl = {};
let t_names = [];
let hidden_elem;
let s=[];
let tt_names = [];
let t_index = [];

//db iNDEXED DB creation////////////////////////////////////////////////////////////////////////////////////////////

let db;

const openOrCreateDB = indexedDB.open('Templates',2);


openOrCreateDB.addEventListener('error',()=>
  console.error('Failed to open DB'));

openOrCreateDB.addEventListener('success',()=>{
  console.log('DB opened successfully');
  db =  openOrCreateDB.result;
  start();
  

});

openOrCreateDB.addEventListener('upgradeneeded',init=>{
   db = init.target.result;

   db.onerror = () =>{
    console.error('Error loading database.');
   };

   const table = db.createObjectStore('Templates_OBJ', { keyPath: 'id', autoIncrement:true });
   table.createIndex('template', 'template', { unique: false });
});




//LOADING TEMPLATES  
   
 function start(){
    const request = db.transaction('Templates_OBJ','readwrite')
    const objectStore = request.objectStore('Templates_OBJ')
    const query = objectStore.getAll();

      query.onsuccess = () =>{

            
            if(query.result.length==0){
              console.log('empty array');
              const first_obj = {'templates':[{'tmpl_name':' ','string value':''}]}
             
              const col_obj=  
              {
                'btn_colors':
              [ 
                {btn_id:'color1',btn_color:'#000'},
                {btn_id:'color2',btn_color:'#D9544D'},
                {btn_id:'color3',btn_color:'#00A8A8'},
                {btn_id:'color4',btn_color:'#A80000'},
                {btn_id:'color5',btn_color:"#ffe302"},
                {btn_id:'color6',btn_color:"#e9692c"},
                {btn_id:'color7',btn_color:"#4E5F70"},
                {btn_id:'color8',btn_color:"#44617b"},
                {btn_id:'color9',btn_color:"#00834e"},
                {btn_id:'color10',btn_color:"#9400d3"}
              ]
              }
              t_names = first_obj.templates;
              custom_colors  = col_obj.btn_colors;
              const colors = col_obj;
              const templates = first_obj;

              objectStore.put(templates), (err, result) => {
                if (!err) {
                    console.log('Template added to object store', result);
                } else {
                    console.error(`Failed to add template: ${err}`);
                }
            };

            
            objectStore.put(colors), (err, result) => {
              if (!err) {
                  console.log('Colors added to object store', result);
              } else {
                  console.error(`Failed to add template: ${err}`);
              }
          };
        }

         else{
          t_names = query.result[0].templates;
          if(query.result[1].btn_colors){
            custom_colors = query.result[1].btn_colors
            console.log(custom_colors);
          }
             

   for(let i = 0,j=0;i<t_names.length;i++)
   {
    if(t_names[i]["string value"]!='')
    tt_names[j++]=t_names[i];
   }

   try{
    draw_sheet(tt_names,1);
   

   }

   catch(e)
   {
    console.log(e);
   }
         
          
         }
      
         setButtonColor();
    };
    query.onerror = (err)=> {
      console.error(`Error to get all templates: ${err}`)
  }
 
}

          
    

try{
  extraF.addEventListener('mouseover',()=>{
    extraF.style.fill = "rgba(71, 91, 99, 1)" 
  })
  
  extraF.addEventListener('mouseout',()=>{
    extraF.style.fill = "rgba(71, 91, 99, 0.6)" 
  })


  
/*------------------------------------------------------SHOW SEARCH RESULTS FROM THE MAIN.HTML-----------------------------------------------------*/
 
  function show(arr){
    let lis = document.getElementById("saves");
    lis.style.display = 'flex';
    let kk="";
   
    for(let i =0;i<arr.length;i++){
        let li = document.createElement("li");
        let li_container = document.createElement('div');
        let copy_image = document.createElement('span');
        copy_image.classList.add("add_image")
        li_container.classList.add("li_container");
        kk+=`
        <a class="a__list" id ="a__list" target= '_blank'>
        ${arr[i]}
        </a>          
        `;+
        li.appendChild(document.createTextNode(arr[i]));
        li_container.appendChild(copy_image);
        li_container.appendChild(li);
        
        lis.appendChild(li_container);
    }
  
    for (let i = 0; i < lis.childNodes.length; i++) {
      let li = lis.childNodes[i];
      let li_img = li.querySelector('span');
      let li_tmpl = li.querySelector('li');
      
      li.addEventListener("click", e => {
        index_c = i;
        li_img.style.backgroundSize = "25px"
        li_img.style.backgroundImage = "var(--done)";
        
      });

      li.addEventListener('mouseenter',()=>appear_img(li_img,li_tmpl));
      li.addEventListener('mouseleave',()=>fade_img(li_img,li_tmpl));
  
      
    }
    

   
  }

  function appear_img(el_img,el_text){
    el_img.style.backgroundSize = "20px"
    el_img.style.backgroundImage = "var(--background-image)";
    el_text.style.color = "#D1462F";
  }

  function fade_img(el_img,el_text){
    el_img.style.backgroundImage = 'none';
    el_text.style.color = "black";
  }


  
}

catch(e)
{
 console.log(e);
}

/*----------------------------------------------------------------------------SEARCH ALGORITHM(MAIN.HTML)-----------------------------------------------------------------*/

try{

  inputEl.addEventListener('input',function(){
   
    lis.innerHTML = '';
    lis.style.display = 'none';
  let i = 0;
  if(inputEl.value.trim().length>=2){
  results = [];
  t_index = [];
  
  
        
        for (const item of t_names) {
    
            if (item['tmpl_name'].toLowerCase().includes(inputEl.value.trim().toLowerCase())
                &&!results.includes(item['tmpl_name'].trim().toLowerCase())) {
              results.push(item['tmpl_name']);  
              t_index.push(t_names.indexOf(item));
            
  
              i++;
      
            }
            
          else {
          lis.innerHTML = '';
          lis.style.display = 'none';
          }
           }
          if (results) {
           
            show(results);
          }
  
          else {         
            lis.innerHTML = '';
            lis.style.display = 'none';
          
          }
        }
  
        else {         
          lis.innerHTML = '';
          lis.style.display = 'none';
        }
      })
  
  

/*----------------------------------------------------------------------------COPYING TO CLIPBOARD-----------------------------------------------------------------*/


      lis.addEventListener('click',function(){
      
  
        navigator.permissions.query({
          name: "clipboard-write"
        }).then(result => {
  
          if (result.state === "granted" || result.state === "prompt") {
     
  
            let PlainText = document.createElement('div');
            let HtmlText = document.createElement('div');
  
            HtmlText.innerHTML = t_names[t_index[index_c]]['string value'];
           
            PlainText.innerHTML = t_names[t_index[index_c]]['string value']
     



const content = t_names[t_index[index_c]]['string value'];


const contentWithLineBreaks = content.replace(/<br\s*\/?>/gi, '\n');

PlainText.innerHTML = contentWithLineBreaks;

  
            navigator.clipboard.write([
              new ClipboardItem({
                'text/plain': new Blob([PlainText.innerText], {
                  type: 'text/plain',
                }),
                'text/html': new Blob([HtmlText.innerHTML], {
                  type: 'text/html',
                }),
              }),
            ]);
          } else if (result.state === "denied") {
        
          }
        })})}

catch(e)
{
  console.log(e);
}
        
          
        try{
          extraF.addEventListener('click', async () => {
            const rty = document.querySelectorAll('[style*="display: none"]');
            rty.forEach((e) => {
              e.style.display = 'inline-block';
            });
            window.open('main_extended.html', 'resizable')
            extended.style.display = 'none';
          })
        }

        catch(e)
        {

        }
         
         
           
    
         
           
            
         
        
      
   
        try{
          delete_butt.addEventListener('click',()=>{
  
            t_names.splice([t_index[index_c]], 1);
            upd(t_names,3);
            
            });
            
            const textarea = document.querySelector('textarea');

            textarea.addEventListener('keyup',e=>{
              textarea.style.height = "440px"
              let scHeight = e.target.scrollHeight;
              textarea.style.height = `${scHeight}px`
            })

        }

        catch(e)
        {

        }
   
              try{
                modify_butt.addEventListener('click',()=>{
                  if(localStorage.getItem("edit_mode")==2)
                     {
                      test.style.display = "none";
                      localStorage.setItem('testVisible',0)
                   
                     }
                     body.style.overflow = "auto";
                       
                        Ss_C.style.display = "grid";
                        localStorage.setItem("edit_mode","1");
                        hide_butt.removeAttribute('disabled')
                 });
              }

              catch(e)
              {

              }
               
                  
try{


           
              add_butt.addEventListener('click', async () => {

               
                  
                    let new_t_name = input_el_name.innerHTML
                    let new_t_body = input_el_body.innerHTML
           
                    if(new_t_name!=""&&new_t_body!="")
                    {
                       
                          
                    const new_obj = {"tmpl_name":new_t_name,"string value":new_t_body}                              
                    
                    if(!duplicate_check(new_obj,0)){
                      
                      upd(new_obj,0)
                      input_el_name.innerHTML = "";
                      input_el_body.innerHTML = "";
                      localStorage.setItem("add_body", "");
                      localStorage.setItem("add_title", "");
                   
                      setTimeout(() => {
                       location.reload();
                      
                     
                      }, "1300")
    
                   
                     
                    }
                      
                       
                    else{
                     alert_m('Duplicate values',0);
                
                    
                    }
                   

                  }

                  else{
                    
                    let empty_potential = [];

                    empty_potential.push( input_el_name,input_el_body);

                    empty_potential.forEach((e)=>{
                      if(e.innerHTML=="")
                      e.style.outline="1px solid red";
                    })
                    alert_m('Empty fields',0);
                  }
              
               });

              }
              catch(e) 
              {
                
              }

          
let fileHandle;
  try{
  

    upd_butt.addEventListener('click', async () => {
    
 
      [fileHandle] = await window.showOpenFilePicker();
     
     
       const file = await fileHandle.getFile();
       const contents = await file.text();
       const upd_object = await JSON.parse(contents);
       const check =  duplicate_check(upd_object.templates,1);
    
       if(!check){
          upd(upd_object,1);  
        
       }
       
       else {
        alert_m("Duplicated value,please change the tmpl_name value",0)
        console.error('Duplicated value');
       }
      

      });
  }

  catch(e)
  {

  }

           
  async function alert_m(msg,b){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    if(b==1){
      await Toast.fire({
        icon: 'success',
        title: msg
      })
    }

    else if(b==0){
      await Toast.fire({
        icon: 'error',
        title: msg
      })

    }
  
 }
 
  function duplicate_check(arr,k){
    duplicates=[];
    let  b = 0;
    if(k==0){
      for(i of t_names){
        if(arr['tmpl_name'].trim()==i['tmpl_name'].trim()) return 1;
  
      }
      return 0;
    }

    else{

      for(let i = 0;i<arr.length;i++){
        for(let j = 0;j<t_names.length;j++){

          if(arr[i]['tmpl_name'].trim()==t_names[j]['tmpl_name'].trim()) {
            duplicates.push(arr[i]['tmpl_name'].trim())
              b=1;
          } 
        }
      }

      if(b==1)
      {
        return 1;
      }

      return 0;
    }
   

 }

 

 
function  upd  (a,b,i){
  
  const transaction = db.transaction(['Templates_OBJ'],'readwrite');
  const objectStore = transaction.objectStore('Templates_OBJ');
  const query = objectStore.getAll();
 
  query.onsuccess = () => {
  const tst = query.result;
  switch(b){
      case 0:{
        tst[0].templates.push(a)
        objectStore.put(tst[0]).onsuccess= () =>{
          console.log('Update successfull')
          alert_m('Templates successfully updated',1);
          t_names.push(a);
                                               }

        objectStore.put(tst[0]).onerror = () =>{
           console.error('Failed to update data');
           alert_m('Failed to upload',0);

       
      }
      break;
              }

      case 1:{
     
          for(i = 0; i< a.templates.length;i++){
            tst[0].templates.push(a.templates[i])
          }
        
      
        
        objectStore.put(tst[0]).onsuccess= () =>{
          console.log('Records added successfully')
          alert_m('Records added successfully',1);
         }
      
         objectStore.put(tst[0]).onerror = () =>{
          console.error('Failed to add data');
          alert_m('Failed to add data',0);
         }
         break;
        }


        
      

      case 3:{
        tst[0].templates = a;
        objectStore.put(tst[0]).onsuccess= () =>{
          console.log('Successfully updated')
          alert_m('Records successfully updated',1)
                                               }

        objectStore.put(tst[0]).onerror = () =>{
           console.error('Failed to update data');
           alert_m('Failed to delete data',0)

       
      }
      

        break;
      }

      
      case 4:{
     
        for(i = 0; i< a.length;i++){
          tst[0].templates.push(a[i])
        }
      
    
      
      objectStore.put(tst[0]).onsuccess= () =>{
        console.log('Added successfull')
        alert_m('Records added successfully',1);
       }
    
       objectStore.put(tst[0]).onerror = () =>{
        console.error('Failed to add data');
        alert_m('Failed to add data',0);
       }
       break;
      }

      case 5:{
        tst[1].btn_colors = a;
        objectStore.put(tst[1]).onsuccess= () =>
        {

         let btn = document.querySelectorAll('.color')
         let j = 0;

         btn.forEach(btn_col=>{
          btn_col.style.backgroundColor = a[j].btn_color;
          j++;
         })
        
          alert_m('Colors successfully updated',1)
      
         }
     
        objectStore.put(tst[1]).onerror = () =>{
           console.error('Failed to update data');
           alert_m('Failed to update colors',0)
      }
      break;
    }

  }
  query.addEventListener('success', () => {
    console.log("Object added to DB");
  });
  transaction.addEventListener('complete', () => {
    console.log('Adding process succ finished');
  });
  transaction.addEventListener('error', () => console.log('Transaction error'));

} 
}

function upd_colors(a){
  
  const transaction = db.transaction(['Templates_OBJ'],'readwrite');
  const objectStore = transaction.objectStore('Templates_OBJ');
  const query = objectStore.getAll();

  query.onsuccess = () =>{
    const result = query.result;
    result[1].btn_colors = a; 
    objectStore.put(result[1]);
  }
}


try{
  upload_t.addEventListener('click',  async  () => {
    
    test.style.display = "none";
    localStorage.setItem('testVisible',0)
    localStorage.setItem("edit_mode","0");
    localStorage.setItem("isUploading","1");


    let csv_b = 0;
    
    const pickerOpts = {
      types: [
        {
          description: "Spreadsheets",
          accept: {
            "Spreadsheet/*": [".xlsx",".csv",".txt",".json"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    let del_11_bUp =  del_el_11;
    let del_12_bUp =  del_el_12;
    let del_13_bUp =  del_el_13;

    del_el_11 = [];
    del_el_12 = [];
    del_el_13 = [];

    try{
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);
     const file = await fileHandle.getFile();
      let file_type = file.type;
     if(file.type==csv)
        {
          file_type=txt;
          csv_b=1;
        }

        
       
     

     
        modify_butt.style.visibility = 'hidden';
        add_t.style.visibility = 'hidden'; 
        download_btn.style.visibility = 'hidden'

        hide_butt.setAttribute('disabled',' ')
        upload_t.style.display = 'none';
        cancel_butt.style.display = 'inline-block'
        save_t.removeAttribute('disabled');
        body.style.overflow = "auto";
switch(file_type)
{
  case xlsx:{
    let tmp = await readXlsxFile(file); 
    let format_tmp = [];
    let arr = [];
    for(let i = 0;i<tmp.length;i++)
    {
     
        format_tmp.push(tmp[i].filter((e)=>{
          return e!=null;
        }))
      }
    
      
    
    for(let i = 0;i<format_tmp.length-1;i+=2)
    {
      for(let j = 0;j<format_tmp[i].length;j++)
      {
        try{
          if(format_tmp[i][j].length<format_tmp[i+1][j].length)
          arr.push({"header":format_tmp[i][j],"body":format_tmp[i+1][j]}) 
          else
           arr.push({"header":format_tmp[i+1],"body":format_tmp[i][j]}) 
      }
      catch(e)
      {
        console.log(e)
      }
        
         
       
      }
     
    }

    
    draw_sheet(arr,2);  
    break;
  }

  case txt:{
       const contents = await file.text();
       let parsed_cont = contents.split("&")
       let arr = [];
       let delimitator;
       delimitator =  csv_b==0?"\r":",";
      
       parsed_cont = parsed_cont.filter((e)=>{
        return e.trim().length>0
       
       })

       for(let i = 0;i<parsed_cont.length;i++)
       {
        for(let j = 0;j<parsed_cont[i].length;j++)
         {
          if(parsed_cont[i][j]==delimitator){
            arr.push({"header":parsed_cont[i].slice(0,j),"body":parsed_cont[i].slice(j+1).trim()})
            break;
         }
       
        }
      
       }
        
       
         
  
       draw_sheet(arr,2);  
       break;     

  }

  case json:
  {
      let json_backup = await file.text();
      let backup_json = JSON.parse(json_backup);
      draw_sheet(backup_json,1,true);
      break;  
  }


 
}




    }
    catch(e)
    {
      del_el_11 = del_11_bUp;
      del_el_12 = del_12_bUp;
      del_el_13 = del_13_bUp;
     
    }
       
  return
  })
}

catch(e)

{ 
  del_el_11 = del_11_bUp;
  del_el_12 = del_12_bUp;
  del_el_13 = del_13_bUp;
 

}

 




//GENERATING HTML ELEMENTS  
  function draw_sheet(tmpl_arr,source,isBackup=false)
{

  let c = 0;
  let container_divs = [];
  let header_divs = [];
  let header_max_height = 19;
  
  source==1?Ss_C.style.display="none":Ss_C.style.display="grid";
 
  
  if(source==2||isBackup==true)
  {
    Ss_C != document.querySelector("#SS_C__upload")?Ss_C.style.display="none":Ss_C.style.display="grid";
    Ss_C = document.querySelector("#SS_C__upload")
    tmpl11 = [];
    tmpl12 = [];
    tmpl13 = [];

   
  
   
  }

  tmpl_arr.length>=5?main_container.style.display = "inline-block":main_container.style.display = "none";

 
  
/*-------------------------------------------------GRID GENERATOR-------------------------------------------------------------------------*/




    for(let i = 0;i<tmpl_arr.length;i++)
      {   
        
        
        c++;
        const rowContainerEl = document.createElement("span");
        const rowContainerEl_header = document.createElement("div");
        const rowContainerEl_separator = document.createElement("div");
        const rowContainerEl_template =  document.createElement("div");
        rowContainerEl.setAttribute("contenteditable","false");
        rowContainerEl_template.setAttribute("contenteditable","false");
        rowContainerEl.style.maxWidth = "1300px";
        


        rowContainerEl_template.className = "cell-row-Template";
        rowContainerEl.className = "cell-row-Body";
        rowContainerEl_header.className = "cell-row-Header";
        rowContainerEl_header.id = "cell-row-Header_"+i+source;
        rowContainerEl.id = "cell-row-Body_"+i+source;
        rowContainerEl_template.id= "cell-row-Template_"+i+source;
        rowContainerEl_template.style.userSelect = "none";
        rowContainerEl.style.userSelect = "none";
        rowContainerEl_header.userSelect = "none";

        
       
          
        switch(source){

            case 1:
              {
                tmpl_arr[i]["string value"]?rowContainerEl.innerHTML = tmpl_arr[i]["string value"]:rowContainerEl.innerHTML=" "             
                tmpl_arr[i]["tmpl_name"]?rowContainerEl_header.innerHTML = tmpl_arr[i]["tmpl_name"]:rowContainerEl_header.innerHTML = " "
                break;
              }

              case 2:
                {
                  
                    tmpl_arr[i].body?rowContainerEl.innerText =  tmpl_arr[i].body:rowContainerEl.innerText=" "
                    
                    tmpl_arr[i].header?rowContainerEl_header.innerText = tmpl_arr[i].header:rowContainerEl_header.innerText = " "
       
              break;
                }

                case 3:
                {
                  for(let j=0;j<tmpl_arr[i].length-1;j++)
                  {  
                   
                    tmpl_arr[i+1][j]?rowContainerEl.innerText = tmpl_arr[i+1][j]:rowContainerEl.innerText=" "
                    
                    tmpl_arr[i][j]?rowContainerEl_header.innerText = tmpl_arr[i][j]:rowContainerEl_header.innerText = " "
                    
                  }

              break;
                }


                default:break;

                        }
  
        rowContainerEl_template.append(rowContainerEl_separator,rowContainerEl)
        container_divs.push( rowContainerEl_template);
        rowContainerEl_header.offsetHeight>header_max_height?header_max_height=rowContainerEl_header.offsetHeight:header_max_height=header_max_height;
        header_divs.push(rowContainerEl_header);


          if(c==5)
          { 
            const rowContainerEl_Header_container = document.createElement("div");
            const rowContainerEl_Container = document.createElement("div");
            rowContainerEl_Header_container.setAttribute("contenteditable","false");  
            rowContainerEl_Container.setAttribute("contenteditable","false");        
            rowContainerEl_Container.className = "cell-row-Container";
            rowContainerEl_Container.id = "cell-row-Container"+"_"+i;+source

            rowContainerEl_Header_container.setAttribute("contenteditable","false");        
            rowContainerEl_Header_container.className = "cell-row-header_Container";
            rowContainerEl_Header_container.id = "cell-row-header_Container"+"_"+i+source;
          
           
            for(let i = 0;i<container_divs.length;i++)
            {
              rowContainerEl_Container.append( container_divs[i]);
              rowContainerEl_Header_container.append( header_divs[i]);
             
            }

            
           
            Ss_C.append( rowContainerEl_Header_container, rowContainerEl_Container) 
            
            container_divs = [];
            header_divs = [];
            c=0;
            //if(i>30) rowContainerEl_Container.style.display = 'none';??Pagination
          }

          if(i==tmpl_arr.length-1)
          {
              const rowContainerEl_Container = document.createElement("div");
              const rowContainerEl_Header_container = document.createElement("div");
             
              rowContainerEl_Header_container.setAttribute("contenteditable","false");  
              rowContainerEl_Container.setAttribute("contenteditable","false");        
              rowContainerEl_Container.className = "cell-row-Container";
              rowContainerEl_Container.id = "cell-row-Container"+"_"+i+source;
              const fake_div = document.createElement("div");
              fake_div.className = "fake_div";
              fake_div.id = "fake_div"+"_"+i+source; 

             

              rowContainerEl_Header_container.setAttribute("contenteditable","false");        
              rowContainerEl_Header_container.className = "cell-row-header_Container";
              rowContainerEl_Header_container.id = "cell-row-header_Container"+"_"+i+source;
                
              for(let i = 0;i<container_divs.length;i++)
              {
                rowContainerEl_Container.append( container_divs[i]);
                rowContainerEl_Header_container.append( header_divs[i]);
                
              }

              Ss_C.append(rowContainerEl_Header_container, rowContainerEl_Container) 
              container_divs = [];
              container_divs = [];
              header_divs = [];
              c=0;
              fake_grid.append(Ss_C, Ss_C__upload,main_container);
     
          }

  }
  
 




/*--------------------------------------------EVENT-LISTENERS------------------------------------------------- */

  for(let i = 0;i<tmpl_arr.length;i++)
  {
   
   tmpl11[i]=document.querySelector('#cell-row-Body_'+i+source)
   tmpl12[i]=document.querySelector('#cell-row-Header_'+i+source)
   tmpl13[i]=document.querySelector('#cell-row-Template_'+i+source)

  
  }

 
  for(let i = 0;i<tmpl_arr.length;i++)
  {
   
   del_el_11[i]=tmpl11[i];
   del_el_12[i]=tmpl12[i];
   del_el_13[i]=tmpl13[i];
  
  }
 


  for(let i = 0;i<tmpl11.length;i++)
  {  
       
        tmpl13[i].addEventListener('dblclick',()=>{

          if(tmpl13[i].style.zIndex!=2)
          {
            tmpl13[i].style.zIndex = "2";
            tmpl13[i].style.width="max-content";
            tmpl13[i].style.maxWidth="max-content"
            tmpl13[i].style.overflow="auto";
            tmpl13[i].scrollIntoView({behaviour:"smooth", block: "center", inline: "end"});
          
           
            tmpl12[i].style.cursor = "context-menu";
            tmpl12[i].scrollTop = 0;
            tmpl12[i].scrollLeft = 0;
    
            tmpl11[i].style.cursor = "text";
            tmpl11[i].style.maxWidth = "1300px";
            tmpl11[i].setAttribute("contenteditable","true");
          }   
    })
    tmpl11[i].addEventListener('paste', handlePaste);
    tmpl12[i].addEventListener('paste', handlePaste);

      tmpl12[i].addEventListener('mouseup', (e) => mouseUp_delete(e, i));
      tmpl13[i].addEventListener('mouseup', (e) => mouseUp_delete(e, i));
      tmpl11[i].addEventListener('mouseup',  (e)=>  text_editor(e));
      
     


    tmpl12[i].addEventListener('dblclick',()=>{
     
      tmpl12[i].setAttribute("contenteditable","true");
      tmpl12[i].style.cursor = "text";
      tmpl12[i].style.overflowY="auto"; 
      tmpl12[i].style.overflowX="hidden"; 
      tmpl12[i].style.resize = "vertical";
      tmpl12[i].style.maxHeight = "max-content";
  
  })


    tmpl12[i].addEventListener('click',()=>{

      tmpl12[i].style.border="3px solid #475B63"
      for(let j = 0;j<tmpl11.length;j++)
      { 
        tmpl13[j].style.width="100%";
        tmpl13[j].style.overflow="hidden";
        tmpl13[j].style.border="3px solid #F5F5F5"
        tmpl13[j].scrollTop = 0;
        tmpl13[j].scrollLeft = 0;
        tmpl13[j].style.zIndex=1;

        tmpl11[j].setAttribute("contenteditable","false");
        tmpl11[j].style.cursor="context-menu";
       

       if(tmpl12[i].id!=tmpl12[j].id)
       {
        tmpl12[j].style.overflow="hidden";
        tmpl12[j].setAttribute("contenteditable","false");
        tmpl12[j].style.border="3px solid #F5F5F5";
        tmpl12[j].style.cursor = "context-menu";
        tmpl12[j].scrollTop = 0;
        tmpl12[j].scrollLeft = 0;
        tmpl12[j].style.resize = "none";
        tmpl12[j].style.maxHeight = "19px";
       }

      }

   
     })

     tmpl13[i].addEventListener('click',(e)=>{
      tmpl13[i].style.border="3px solid #475B63"
      tmpl12[i].style.overflow="hidden";
    
      tmpl12[i].scrollTop = 0;
      tmpl12[i].scrollLeft = 0;
      tmpl12[i].style.resize = "none";
      tmpl12[i].style.maxHeight = "19px";
      tmpl12[i].style.overflow="hidden";

        for(let j = 0;j<tmpl11.length;j++)
        {
          if(tmpl13[j].style.zIndex==2&&tmpl13[i].id!=tmpl13[j].id)
          {
            
            tmpl13[j].style.zIndex=1;       
            tmpl13[j].style.overflow="hidden"
            tmpl13[j].style.maxWidth =  "100%";     
            tmpl13[j].scrollTop = 0;
            tmpl13[j].scrollLeft = 0;
            tmpl11[j].setAttribute("contenteditable","false");
            tmpl11[j].style.cursor="context-menu";          
            
          }

          if(tmpl13[i].id!=tmpl13[j].id) 
          {
            tmpl13[j].style.border="3px solid #F5F5F5";
          }
            tmpl12[j].style.border="3px solid #F5F5F5"; 
            tmpl12[j].style.cursor = "context-menu";
            tmpl12[j].setAttribute("contenteditable","false");
            tmpl12[j].scrollTop = 0;
            tmpl12[j].scrollLeft = 0;
            tmpl12[j].style.resize = "none";
            tmpl12[j].style.maxHeight = "19px";    
            tmpl12[j].style.overflow="hidden";     
       }
     })
  }
  


}        
/*----------------------------------------------------END OF DRAW FUNCTION-----------------------------------------------------------*/

 /*----------------------------------------------------SAVE FILES----------------------------------------*/   





     

  

try
{
  save_t.addEventListener('click',()=>{
   
    let body = [];
    let title = [];
    let incomplete = [];
    let new_obj = [];
    let duplicate = 0;
    let empty_cell = [];
    let switch_var_incomplete = 0;
   
    localStorage.setItem("isUploading","0");

        for(let i = 0;i<del_el_11.length;i++)
        {
          if(del_el_11[i].innerText.trim()!=""&&del_el_12[i].innerText.trim()!="")
          {
            body.push(del_el_11[i].innerHTML)
            title.push(del_el_12[i].innerText)
          }

          else{

            del_el_11[i].innerText.trim()==""&&del_el_12[i].innerText.trim()==""? empty_cell.push(del_el_12[i],del_el_13[i])
                                                                          : del_el_12[i].innerText.trim()==""
                                                                          ? empty_cell.push(del_el_12[i])
                                                                          : empty_cell.push(del_el_13[i]);
              }

          for(let j = i+1;j<del_el_11.length;j++)
          {
            del_el_12[i].innerText.trim()==del_el_12[j].innerText.trim()&&del_el_12[i].innerText.trim()!=""?duplicate = 1
                                                                                                  :duplicate=duplicate;
          }

          duplicate == 1?incomplete.push(del_el_12[i]):duplicate=0
  
          
          }
  

           


  incomplete.length==0&&empty_cell.length==0?switch_var_incomplete=1
                                            :incomplete.length!=0&&empty_cell.length!=0  
                                            ?switch_var_incomplete=2
                                            :incomplete.length!=0
                                            ?switch_var_incomplete=3
                                            :switch_var_incomplete=4;

                                      

                                           

  switch(switch_var_incomplete)
  {
    case 1:
      {
        for(let i = 0;i<body.length;i++)
        {  
       
           new_obj.push({"tmpl_name":title[i],"string value":body[i]})
         
        } 
       
       let duplex = duplicate_check(new_obj,1);
       if(localStorage.getItem("edit_mode")==1||localStorage.getItem("edit_mode")==2) duplex=2;
       
           if(duplex==0)
           {
           
             upd(new_obj,4);
             setTimeout(function(){
               location.reload();
           
             },1000)  
           }
           else if(duplex==2)
           {
            
            upd(new_obj,3);
       
            setTimeout(function(){
              location.reload();
          
            },1000)  
           }
           
           else{
       
             for(let i = 0;i<del_el_12.length;i++)
             {
               for(let j = 0;j<duplicates.length;j++)
               {
                 if(del_el_12[i].innerText.trim()==duplicates[j])
                 del_el_12[i].style.border = "3px solid #FF0000"
               }
             }
             alert_m("Duplicated values",0)
             
       
           }
         }

        break;
      


    case 2:
      {
        for(let i = 0;i<incomplete.length;i++)
         {
           incomplete[i].style.border = "3px solid #FFFF00"
         }

         for(let i = 0;i<empty_cell.length;i++)
         {
          empty_cell[i].style.border = "3px solid #FFFF00"
         }

         alert_m("Identical titles and empty fields",0);

        break;
      }
  
    case 3:
      {
        for(let i = 0;i<incomplete.length;i++)
         {
           incomplete[i].style.border = "3px solid #FFFF00"
         }
    
      alert_m("Identical titles",0);


        break;
      }
    
    case 4:
      {
        for(let i = 0;i<empty_cell.length;i++)
         {
          empty_cell[i].style.border = "3px solid #FFFF00"
         }
    
      alert_m("Empty fields",0);
  
        break;
      }


    default:break
    

  }
 
})
}

catch(e){
  console.log(e);

}
  
 

 try
 {

 
add_t.addEventListener("click",()=>{

  if(localStorage.getItem("add_active")=="1")
      add_tmpl_ico.setAttribute('disabled','');
     
  main_form.style.display = "flex"; 
  main_form.style.top = 100+scrollY+"px";
  let leftPosition = (window.innerWidth - main_form.offsetWidth) / 2 + scrollX;
  main_form.style.left = leftPosition+"px";
  input_el_body.style.display = "inline-block";
  input_el_name.style.display = "inline-block";
  add_butt.style.display = "inline-block";
  abort_butt.style.display = "inline-block";
  localStorage.setItem("add_active", "1");

  
  
})
 }

 catch(e)
 {
  console.log(e);
 }

 try
 {
  abort.addEventListener("click",()=>{
 
    main_form.style.display = "none"; 
  
    input_el_body.style.display = "none";
    input_el_name.style.display = "none";
    add_butt.style.display = "none";
    abort_butt.style.display = "none";
    input_el_body.innerHTML = "";
    input_el_name.innerHTML = "";
    add_tmpl_ico.setAttribute('disabled','');
    add_active = 0;
    localStorage.setItem("add_active", "0");
    localStorage.setItem("add_body", "");
    localStorage.setItem("add_title", "");
    
  
  })


 }

 catch(e)
 {
  console.log(e);
 }

try
{
  add_tmpl_ico.addEventListener('click',()=>{
  
    main_form.style.display = "flex"; 
    main_form.style.top = 100+scrollY+"px";
    let leftPosition = (window.innerWidth - main_form.offsetWidth) / 2 + scrollX;
    main_form.style.left = leftPosition+"px";
    input_el_body.style.display = "inline-block";
    input_el_name.style.display = "inline-block";
    add_butt.style.display = "inline-block";
    abort_butt.style.display = "inline-block";
    add_tmpl_ico.setAttribute('disabled','');
  })

  settings_color_ico.addEventListener('click',()=>{
    edit_container.style.display = 'flex'
    edit_container.style.top = 250+scrollY+"px";
    edit_container.style.left = scrollX+650+"px";
    settings_color_ico.setAttribute('disabled','');
    localStorage.setItem('set_color_mode','1');
  })


}

catch(e)
{
  console.log(e);
}

try{
  close_tmpl_ico.addEventListener("click",()=>{
  
    main_form.style.display = "none"; 
   add_tmpl_ico.removeAttribute('disabled');
   
  
  })
  input_el_body.addEventListener('input',()=>{ 
    localStorage.setItem('add_body',input_el_body.innerText);
    input_el_body.style.outline = "none";
  })
  input_el_name.addEventListener('input',()=>{
  
    input_el_name.style.outline = "none";

  localStorage.setItem('add_title',input_el_name.innerText);
  })

}

catch(e)
{
  console.log(e);
}




 
  
  
 // -------------------------------------------Draggable Element----------------------------------------------------------------------------//
let dragElements = document.querySelectorAll('.drag_element')
 
 try{

  dragElements.forEach((dragEl) => {
    dragEl.addEventListener('mousedown', (e) => {
   
      dragElement(e, dragEl);
    });
  });

   
  function dragElement(e, elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
 
    if (elmnt.querySelector('header')) {
      elmnt.querySelector('header').onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
  
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
  
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
  
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
  
      elmnt.style.cursor = 'move';
      elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
      elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      
    }
  }

function hide_element(element,icon)
{
  const add_tmplObserver = new IntersectionObserver((entries,observer)=>{
    entries.forEach((entry) => {
    if (entry.isIntersecting==false&&element.style.display == "flex")
    {
      element.style.display = "none"; 
      icon.removeAttribute('disabled');
    }
  })},
  
    {})
  
    add_tmplObserver.observe(element);
}

hide_element(main_form,add_tmpl_ico)
hide_element(edit_container,settings_color_ico)

  input_el__menu_bar.addEventListener('input',()=>{
    input_el__menu_bar.setAttribute("data-active",1)

    res = [];
    if(input_el__menu_bar.value.trim()!=""&&input_el__menu_bar.value.length>=2)
    {
     del_el_12.forEach((e,i)=>
     {
     if(e.textContent.trim().toLowerCase().includes(input_el__menu_bar.value.trim().toLowerCase())){
      res.push({"text":del_el_12[i].textContent,"index":i,"selected":"0","parent":"NaN"});
     }
   
         
     })
     
     
     }

     else
     {
      remove_elem(list_search,"li");
     }
     
     remove_elem(list_search,"li");
     show_s_result(res);  
     if(list_search.hasChildNodes())
     {
      let id = 0;
      
      input_el__menu_bar.style.borderTopRightRadius = "10px";
      input_el__menu_bar.style.borderTopLeftRadius  = "10px";
      input_el__menu_bar.style.borderBottomRightRadius = "0px";
      input_el__menu_bar.style.borderBottomLeftRadius = "0px";
      list_search.style.borderBottomRightRadius = "10px";
      list_search.style.borderBottomLeftRadius = "10px";
      list_search.style.visibility = "visible";

      
      
     }

     else{
      list_search.style.visibility = "hidden";
      input_el__menu_bar.style.borderRadius = "25px";
      
     }

 
  })
  list_search.addEventListener('mouseleave',()=>{
  input_el__menu_bar.setAttribute("data-active",0)
})

list_search.addEventListener('mouseenter',()=>{
  input_el__menu_bar.setAttribute("data-active",1)
})
  function show_s_result(arr)
  { 
    arr.forEach((i)=>{
      let res = document.createElement("li");
      res.setAttribute("data-index",i.index)
      res.setAttribute("data-selected","0");
      res.textContent = i.text;
      i.parent = res;
      list_search.appendChild(res);
   
    })
   
   

  }

  function remove_elem(parent,el)
  {
   
    let b = parent.querySelectorAll(el);
    b.forEach(e=>{
      parent.removeChild(e);
    }) 
    id=0;
    first_zero = 0;  
  }


  function clicked(e,src=1){
 
    if(src==1)
    {
      
      let n_chosen = res.filter((el)=>
        el.index!=e.target.dataset.index
      )

      let chosen = res.filter((el)=>
      el.index==e.target.dataset.index
    )

      n_chosen.forEach((e)=>{
        e.parent.style.backgroundColor = "white"
        e.parent.dataset.selected = 0;
        e.selected=0;
        
      })
   
      chosen[0].parent.style.backgroundColor = "rgba(71, 91, 99, 0.18)"
      chosen[0].parent.dataset.selected = 1;
      chosen[0].selected = 1;
      

      
      index = e.target.dataset.index;
      
    }
   else if(src==2)
   {
    index = localStorage.getItem('edit2Index');
   }
   
  else{
    
    index = e.index;
    console.log(e);
    e.parent.dataset.selected = 1;

  }
  
 if(localStorage.getItem("edit_mode")==0&&localStorage.getItem("isUploading")!="1"||localStorage.getItem("edit_mode")==2)
 {
  localStorage.setItem("edit_mode","2")
  header_test.setAttribute("contenteditable","true")
  body_test.setAttribute("contenteditable","true")
 
  header_test.innerHTML = del_el_12[index].innerHTML;
  body_test.innerHTML = del_el_11[index].innerHTML;
  localStorage.setItem('edit2Index',index);
  localStorage.setItem('body_test',body_test.innerHTML);
  localStorage.setItem('header_test',header_test.innerHTML);
  test.style.display = "flex";
  localStorage.setItem('testVisible',1)
  body_test.scrollIntoView({behaviour:"smooth", block: "end", inline: "end"});
  body.style.overflowX = "hidden";
  body.style.overflowY = "hidden";


  header_test.addEventListener('input',()=>{
    let header = header_test.innerHTML;
    del_el_12[index].textContent = header;
    localStorage.setItem('header_test',header);
    localStorage.setItem('body_test',body_test.innerHTML);

  })

  header_test.addEventListener('click',()=>{
   header_test.style.outline = "3px solid #475B63" 
   header_test.style.outlineOffset = ".5vw"
      body_test.style.outline = "3px solid #f5f5f5";
      body_test.style.outlineOffset = "0%"
  })

  body_test.addEventListener('click',()=>{
    body_test.style.outline = "3px solid #475B63 "
    body_test.style.outlineOffset = ".5vw"
       header_test.style.outline = "3px solid #f5f5f5 "; 
      header_test.style.outlineOffset = "0%"
   })



  body_test.addEventListener('mouseup',(e)=>{
    let body = body_test.innerHTML;
    del_el_11[index].innerHTML = body;
    localStorage.setItem('body_test',body);
    localStorage.setItem('header_test',header_test.innerHTML);
    text_editor(e);
  })


  
 }
    
    del_el_13[index].scrollIntoView({behaviour:'smooth',block:'center',inline:'center'});
    del_el_13[index].style.border = "3px solid #475B63"

    
    for(let i = 0;i<del_el_13.length;i++)
    {
      if(del_el_13[i].id!=del_el_13[index].id)
        del_el_13[i].style.border = "3px solid #F5F5F5"
    }
  }


 }
 
 catch(e)
 {
  console.log(e);
 }

try{
  list_search.addEventListener('click',clicked)
  
 
}



catch(e)
{

}


try{


list_search.addEventListener('mouseover',(e)=>{
    if(!e.target.id)
  e.target.style.backgroundColor = "rgba(71, 91, 99, 0.18)";
  
})

list_search.addEventListener("mouseout",(e)=>{
  if(e.target.dataset.selected==0)
  e.target.style.backgroundColor = "white";

})
let down;

let id=0;
let first_zero=0;
window.addEventListener('keyup',(e)=>{
  down=0;

  res.forEach((el,i)=>{
     if(el.selected=="1")
     {
       id = i;
       el.selected="0"
       e.target.dataset.selected = "0";       
     }
       
     }
    )
    



 id=='undefined'?id=0:id=id

   switch(e.code){
     case "ArrowDown":{
       if(id==res.length-1)
          {
            res[id].parent.style.backgroundColor = "white";
            res[id].parent.dataset.selected = 0;
            list_search.scrollTop = res[0].parent.offsetTop - list_search.offsetTop;
            list_search.scrollLeft = 0;
            id=0;
            down=1;
         }
      if(id==0&&down==1)
      { 
        res[0].parent.style.backgroundColor = "rgba(71, 91, 99, 0.18)";
        clicked(res[0],0);  
        list_search.scrollTop = res[0].parent.offsetTop - list_search.offsetTop;
        list_search.scrollLeft = 0;
      }

    
      else if(id==0&&first_zero==0)
            {
             res[id].parent.style.backgroundColor="rgba(71, 91, 99, 0.18)"
             clicked(res[id],0);
             list_search.scrollTop = res[0].parent.offsetTop - list_search.offsetTop;
             list_search.scrollLeft = 0;
             first_zero = 1;
            }

      else{
            res[id].parent.style.backgroundColor = "white";
            res[id].parent.dataset.selected = 0;
            id++;
      
            res[id].parent.style.backgroundColor="rgba(71, 91, 99, 0.18)"
            list_search.scrollTop = res[id].parent.offsetTop - list_search.offsetTop;
            list_search.scrollLeft = 0;
            clicked(res[id],0);
          }
            break;
            }
 
     case "ArrowUp":{
       if(id==0)
       {
           res[0].parent.style.backgroundColor="white"
           res[0].parent.dataset.selected = 0;
           list_search.scrollTop = res[res.length-1].parent.offsetTop - list_search.offsetTop;
           list_search.scrollLeft = 0;
           clicked(res[res.length-1],0);
           id=res.length-1;
           res[id].parent.style.backgroundColor="rgba(71, 91, 99, 0.18)"
       }
    else{
      try{
        res[id].parent.style.backgroundColor = "white";
        res[id].parent.dataset.selected = 0;
        id--;
        list_search.scrollTop = res[id].parent.offsetTop - list_search.offsetTop;
        list_search.scrollLeft = 0;
        res[id].parent.style.backgroundColor="rgba(71, 91, 99, 0.18)"
        clicked(res[id],0);
      }

      catch(e)
      {
        id=0;
      }

   
    }
      
      
       break;
 }
 
   }
 
 
})

}

catch(e)
{
 console.log(e);
}
//-----------------------------------------------------Context Menu------------------------------------------------------

try{


document.addEventListener("mousedown",(e)=>{
    if(custom_menu.dataset.active==0) 
    hideMenu()

    if(input_el__menu_bar.dataset.active==0)
    {
      list_search.style.visibility = "hidden";
      input_el__menu_bar.style.borderRadius = "25px";
    }

  }) 

 function hideMenu() { 
  custom_menu.style.display = "none" 
 } 


 custom_menu.addEventListener('contextmenu',(e)=>{
   e.preventDefault();
 })
document.addEventListener('contextmenu',(e)=>{
  if(custom_menu.dataset.active==1)
  e.preventDefault();
})
 custom_menu.addEventListener("mouseup",(e)=>{

  e.preventDefault();
if(e.button==0)
{

  disableScroll();
  let target = e.target.parentElement;
  let target_object = {"header":custom_menu.dataset.header, "body":custom_menu.dataset.body,"index":custom_menu.dataset.index}
  let target_object_body = document.querySelector("#"+target_object.body);
  let target_object_header = document.querySelector("#"+target_object.header);

  switch(target.id)
      {
        case "cont_copy":
          {
            setTimeout(()=>{
              enableScroll();
            },300)
            break;
          }

          case "cont_del":
            {
              target_object_body.remove();
              target_object_header.remove(); 
              del_el_13 = del_el_13.filter((e)=>e.id!=tmpl13[target_object.index].id);  
              del_el_12 = del_el_12.filter((e)=>e.id!=tmpl12[target_object.index].id);
              del_el_11 = del_el_11.filter((e)=>e.id!=tmpl11[target_object.index].id);
              save_t.removeAttribute('disabled')

              setTimeout(()=>{
                enableScroll();
              },300)
              break;
            }

            case "cont_edit":
            {
             
              setTimeout(()=>{
                enableScroll();
              },300)
              break;
            }
      }
      hideMenu();
      


}
  
  
      
      


 })

const side_menu = document.querySelector(".menu_bar");

side_menu.addEventListener('contextmenu',()=>{
  hideMenu();
})

main_form.addEventListener('contextmenu',()=>{
  hideMenu();
})

add_tmpl_ico.addEventListener('contextmenu',()=>{
  hideMenu();
})

settings_color_ico.addEventListener('contextmenu',()=>{
  hideMenu();
})
function disableScroll() {
  
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

    
      window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
      };
}

function enableScroll() {
  window.onscroll = function() {};
}

custom_menu.addEventListener('mouseenter',()=>{
  custom_menu.setAttribute("data-active",1)
})
custom_menu.addEventListener('mouseleave',()=>{
  custom_menu.setAttribute("data-active",0)
})

document.addEventListener("scroll", () => {

  hideMenu();


 })


 window.addEventListener("load", () => {
 
  setTimeout(()=>{
   
   let edit = localStorage.getItem("edit_mode");
    switch(edit)
    {

      case '0':
            {
              Ss_C.style.display="none";
              body.style.overflow = "hidden";
              test.style.display = "none";
              localStorage.setItem('testVisible',0)
             
              break;
            }


      case '1':
        {
          hide_butt.removeAttribute('disabled')
          body.style.overflow = "auto";
          test.style.display  = "none";
          Ss_C.style.display  =  "grid";
          localStorage.setItem('testVisible',0)
          

          break;
        }

        case '2':
          {
         
            if(localStorage.getItem('testVisible')==1)
              clicked(index,2);
          
              break;
          }

          default: break;

          
    }

    
   

  },300)
  
if(localStorage.getItem("add_active")==1) 

  setTimeout(() => {
    add_tmpl_ico.removeAttribute('disabled');
    input_el_body.innerHTML = localStorage.getItem('add_body');
    input_el_name.innerHTML = localStorage.getItem('add_title');
   
  }, 300); 

  if(localStorage.getItem('set_color_mode')=='1')
  setTimeout(() => {
    settings_color_ico.removeAttribute('disabled');
  },300)
  
    
  

});

cancel_butt.addEventListener('click',()=>{

  bool_edited==1?localStorage.setItem("edit_mode","1"):localStorage.setItem("edit_mode","0")
  bool_edited=0;
  localStorage.setItem("isUploading","0");
  location.reload();
})

hide_butt.addEventListener("click",()=>{
  Ss_C.style.display = "none";
  save_t.setAttribute('disabled','')
  hide_butt.setAttribute('disabled','')
  localStorage.setItem("edit_mode",2)
  body.style.overflow = "hidden";
  
})
document.addEventListener('input',(e)=>{
  if(e.target!=input_el__menu_bar&&e.target!= input_el_body
                                  &&e.target!=input_el_name)
      save_t.removeAttribute('disabled')
})

}

catch(e)
{
   console.log(e);
}

function mouseUp_delete(event, index) {
  if (event.button === 2) {
    custom_menu.style.left = event.pageX + "px";
    custom_menu.style.top = (event.pageY - 20) + "px";
    custom_menu.style.display = "block";
    custom_menu.setAttribute("data-Body", tmpl13[index].id);
    custom_menu.setAttribute("data-Header", tmpl12[index].id);
    custom_menu.setAttribute("data-Index", index);

    tmpl13[index].style.border = "3px solid #475B63";

    for (let j = 0; j < tmpl13.length; j++) {
      if (j !== index) {
        tmpl13[j].style.border = "3px solid #f5f5f5";
        tmpl12[j].style.border = "3px solid #f5f5f5";
        tmpl13[j].style.width = "100%";
        tmpl13[j].style.overflow = "hidden";
        tmpl13[j].scrollTop = 0;
        tmpl13[j].scrollLeft = 0;
        tmpl13[j].style.zIndex = 1;
        tmpl11[j].setAttribute("contenteditable", "false");
        tmpl11[j].style.cursor = "context-menu";
      }
    }
  }
}

input_el_body.addEventListener('paste', handlePaste);

function handlePaste(event) {
  event.preventDefault();
  let pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');
  pastedText = pastedText.replace(/font-family\s*:\s*([^;\r\n]+);/gi, "font-family: 'Merriweather', sans-serif;");
  pastedText = pastedText.replace(/\r?\n/g, '<br>');

  document.execCommand('insertHTML', false, pastedText);

  const selection = window.getSelection();
  const range = document.createRange();
  range.setStartAfter(event.target.lastChild);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

//-----------------------------------------------------------------------------TEXT REDACTOR-------------------------------------------------------------------------------------//

  bold_btn.addEventListener('click', () => text_Redactor("bold"));
  italic_btn.addEventListener('click', () => text_Redactor("italic"));
  underline_btn.addEventListener('click', () => text_Redactor("underline"));
  sthrough_btn.addEventListener('click',()=>text_Redactor("strikeThrough"));
  ulList_btn.addEventListener('click', () => text_Redactor("insertUnorderedList"));
  olList_btn.addEventListener('click', () => text_Redactor("insertOrderedList"));  

  color_section.addEventListener('mouseenter',(e)=>{
    color_container.style.display = 'flex';
    let left_pos;
    let top_pos;
   
    isEdgeReached(e,320)?left_pos = -121.5:left_pos=0;
    isTopReached(e,125)?top_pos=29:top_pos=-87;
    set_location(color_btn__redactor,color_container,left_pos,top_pos);
   
    
  })

  function setButtonColor() {

let i = 0;
    var button = document.querySelectorAll('.color');
    var input_edit = document.querySelectorAll('.color_edit')
    button.forEach(button=>{
      button.style.backgroundColor = custom_colors[i].btn_color;
      i++;
    })
    let j =0;
    input_edit.forEach(iputEdit=>{
      iputEdit.value = custom_colors[j].btn_color;
      col_edit_dataset.push(iputEdit.dataset.color);
      j++;
    })
   

   
  }  
 

  color_container.addEventListener('mouseleave',()=>{
    color_container.style.display = 'none';
  })

  color_container.addEventListener('click',(e)=>{
    const colorItem = e.target.closest('.color');
    if(colorItem)
      {
        const selectedColor = colorItem.style.backgroundColor;
        change_color(selectedColor);
      }
      
  })

cust_color.addEventListener('change',(e)=>{
   
    change_color( e.target.value);
})


function text_Redactor(command) {
  
  if (document.queryCommandSupported(command)) {
    
    document.execCommand(command, false, null);
  } else {
    console.log(`Command '${command}' is not supported.`);
  }
}

function change_color(color) {
  if (document.queryCommandSupported('forecolor')) {


    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

 
    document.execCommand('forecolor', false, color);

   
    setTimeout(() => {
   
      span_replacement();

    
      selection.removeAllRanges();
      selection.addRange(range);
    }, 10); 
  } else {
    console.log(`Command 'forecolor' is not supported.`);
  }


  }


 
function span_replacement(){

const fontElements = document.querySelectorAll('font');

fontElements.forEach(fontElement => {
 
  if (fontElement.hasAttribute('color')) {
  
    const newSpan = document.createElement('span');

   
    newSpan.style.color = fontElement.getAttribute('color');

  
    while (fontElement.firstChild) {
      newSpan.appendChild(fontElement.firstChild);
    }

    
    
    fontElement.replaceWith(newSpan);
    setTimeout(() => {
      reselect(newSpan);
      
    }, 10);
   
  }
});

}

function reselect(element){
  let range = new Range();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

}

function text_editor(ev) {
  const selection = window.getSelection();

  
  if (selection.rangeCount > 0) {
     const range = selection.getRangeAt(0);
   
    const user_selection = selection.toString().trim();

    if (user_selection) {
      let left_pos;
      let top_pos;
      
      isEdgeReached(ev,320)?left_pos = -320:left_pos=0;
      isTopReached(ev,125)?top_pos=22:top_pos=-35;
      set_location(range,editMenu,left_pos,top_pos);

      editMenu.style.display = 'flex';
    
    }
  }
}
document.addEventListener('mouseup', () => {
  setTimeout(() => {
    if (!window.getSelection().toString().trim()) 
    {
        editMenu.style.display = 'none';
        color_container.style.display = 'none';
    }
}, 10); 
});
function set_location(range,el,k=0,l=0){
  const rect = range.getBoundingClientRect();
  const absoluteLeft = rect.left + window.pageXOffset;
  const absoluteTop = rect.top + window.pageYOffset;

  el.style.left = `${absoluteLeft+k}px`;
  el.style.top = `${absoluteTop +l}px`;
}


settings_color.addEventListener('click',(e)=>{
  settings_color_ico.setAttribute('disabled','');
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  let cursorX = e.clientX;
  let cursorY = e.clientY;
  edit_container.style.top = cursorY+scrollY+"px";
  if(isEdgeReached(e,320))
  edit_container.style.left =cursorX-200+scrollX+"px";
  else
  edit_container.style.left =cursorX-80+scrollX+"px";
  edit_container.style.display = "flex"; 
  localStorage.setItem('set_color_mode','1');

})

save_editColorbtn.addEventListener('click',()=>{

  var edit_input = document.querySelectorAll('.color_edit')
  let i = 0;
  let r = 0;
  edit_input.forEach(iputE=>{
    if(iputE.dataset.color.includes('#')&&iputE.dataset.color!=custom_colors[i].btn_color)
    {
      custom_colors[i].btn_color =  iputE.dataset.color;
      r=1;
    }
   
    i++;
   })


  if(r==1)
  {
    upd(custom_colors,5);
    
    setTimeout(()=>{
      edit_container.style.display = "none"; 
    },1500)
  }

  else{
     edit_container.style.display = "none"; 
  }


  localStorage.setItem('set_color_mode','0');

})

cancel_editColorbtn.addEventListener('click',()=>{
let i = 0;
 var edit_input = document.querySelectorAll('.color_edit')

 edit_input.forEach(iputE=>{
  iputE.dataset.color = col_edit_dataset[i];
  iputE.value = custom_colors[i].btn_color;
  i++;
 })
  edit_container.style.display = "none"; 
  localStorage.setItem('set_color_mode','0');
})

edit_container.addEventListener('input',(e)=>{
  e.target.dataset.color = e.target.value;

})

function isEdgeReached(event,distance)
{
  let edge_distance_left = document.documentElement.clientWidth-event.clientX;
  if(edge_distance_left<distance)
  return true
  return false
}

function isTopReached(event,distance)
{
  if(event.clientY<distance)
  return true

  return false

}

download_btn.addEventListener('click',()=>{

  const jsonData = JSON.stringify(t_names , null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'TM_backup.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})


let menu_buttons = document.querySelectorAll('.button');

menu_buttons.forEach(button=>{
 
  
    button.addEventListener('mouseover',()=>{
      if(button.getAttribute('disabled')==null)
      button.style.color = 'rgba(71, 91, 99, 1)'
    })

    button.addEventListener('mouseleave',()=>{
      if(button.getAttribute('disabled')==null)
      button.style.color = 'rgba(71, 91, 99, 0.8)' 
    
    })
  

  if(button.id == 'add_t')
  {
    button.addEventListener('mouseover',(e)=>{
      if(e.target.id!='add_t')
      {
        drop_down_upload.style.backgroundColor = 'rgba(71, 91, 99, 0.1)'
        button.style.color='rgba(71, 91, 99, 0.8)'
      }
      else
      {
        drop_down_upload.style.backgroundColor = 'rgba(71, 91, 99, 0.05)'
        button.style.color = 'rgba(71, 91, 99, 1)'
      }
       
      
  
    })

    button.addEventListener('mouseleave',()=>{
     
      button.style.color = 'rgba(71, 91, 99, 0.8)'
      drop_down_upload.style.backgroundColor = 'rgba(71, 91, 99, 0.05)'
    })
  }

  else if(button.id == 'modify')
  {
    button.addEventListener('mouseover',(e)=>{
      if(e.target.id!='modify')
      {
        drop_down_download.style.backgroundColor = 'rgba(71, 91, 99, 0.1)'
        button.style.color='rgba(71, 91, 99, 0.8)'
      }
      else
      {
        drop_down_download.style.backgroundColor = 'rgba(71, 91, 99, 0.05)'
        button.style.color = 'rgba(71, 91, 99, 1)'
      }
       
      
  
    })

    button.addEventListener('mouseleave',()=>{
     
      button.style.color = 'rgba(71, 91, 99, 0.8)'
      drop_down_download.style.backgroundColor = 'rgba(71, 91, 99, 0.05)'
    })
  }
 
  

})

drop_down_upload.addEventListener('click',(e)=>{
  e.stopPropagation();
  upload_t.click();

})

drop_down_download.addEventListener('click',(e)=>{
  e.stopPropagation();
  download_btn.click();

})

