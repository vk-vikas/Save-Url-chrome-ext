let myLeads = []
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveTab = document.getElementById("save-btn");

let dataFromLocalStorgae = JSON.parse(localStorage.getItem("myLeads"));

deleteBtn.addEventListener("dblclick" , () => {
    localStorage.clear();
    myLeads = [];
    listItems = "";
    renderLeads();
})

saveTab.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true} , (tabs) => {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        inputEl.value = "";
        renderLeads();
    })
})

const renderLeads = () => {
    let listItems = "";
    myLeads.map(e => {
        listItems += 
        `<li> 
        <a target="_blank" href="&{e}"> ${e}</a>
        </li?` 
    })
    ulEl.innerHTML = listItems;
}

if(dataFromLocalStorgae) {
    myLeads = dataFromLocalStorgae;
    renderLeads();
}

inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEl.value = "";
    renderLeads();
})