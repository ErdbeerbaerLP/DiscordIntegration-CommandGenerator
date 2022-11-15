let argcount = 0;

function generateCmd() {
  var output = document.getElementById("output");

  function escapeStr(str) {
    if (str === undefined) return "";
    return str.replaceAll('"', '\\"');
  }

  function addElement(type, str) {
    var element = document.createElement("span");
    element.setAttribute("class", "cmd-" + type);
    element.innerHTML = str;
    output.append(element);
  }
  function addEqual() {
    output.append(" = ");
  }
  output.innerHTML = "";
  //create a header element and add it to the output
  addElement("header", "    [[commands.customCommands]]\n");
  addElement("describer", "        name");
  addEqual();
  addElement(
    "string",
    '"' +
      escapeStr(document.getElementById("cmdname").value)
        .toLowerCase()
        .replaceAll(" ", "") +
      '"\n'
  );
  addElement("describer", "        description");
  addEqual();
  addElement(
    "string",
    '"' + escapeStr(document.getElementById("cmddesc").value) + '"\n'
  );

  let mccmd = document.getElementById("mccmd").value;
  if (mccmd.startsWith("/")) mccmd = mccmd.substr(1);
  addElement("describer", "        command");
  addEqual();
  addElement("string", '"' + escapeStr(mccmd) + '"\n');
  addElement("describer", "      adminOnly");
  addEqual();
  addElement("boolean", document.getElementById("adminOnly").checked + "\n");
  addElement("describer", "\n");
  function getElementByID(tags, id) {
    let tag = {};
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        tag = tags[i];
        break;
      }
    }
    return tag;
  }
  const tags = document.querySelectorAll("#args > div");
  console.log(tags);
  for (let i = 0; i < tags.length; i++) {
    const inputs = tags[i].getElementsByTagName("input");
    addElement("header", "        [[commands.customCommands.args]]\n");
    addElement("describer", "          name");
    addEqual();
    addElement(
      "string",
      '"' +
        escapeStr(getElementByID(inputs, "argName").value).toLowerCase() +
        '"\n'
    );
    addElement("describer", "          description");
    addEqual();
    addElement(
      "string",
      '"' + escapeStr(getElementByID(inputs, "argDesc").value) + '"\n'
    );
    addElement("describer", "          optional");
    addEqual();
    addElement("boolean", getElementByID(inputs, "argOptional").checked + "\n");
  }
}

function delArg() {
  document.querySelectorAll("#args > div").forEach((tag) => {
    if (tag.id === "arg" + argcount) {
      tag.remove();
    }
  });
  argcount--;
  if (argcount === 0) document.getElementById("delargbtn").disabled = true;
  if (argcount < 25) document.getElementById("addargbtn").disabled = false;
}

function addArg() {
  //Counting and Button logic
  argcount++;
  document.getElementById("delargbtn").disabled = false;
  if (argcount >= 25) document.getElementById("addargbtn").disabled = true;
  //Argument container

  const argDiv = document.createElement("div");
  argDiv.setAttribute("id", `arg${argcount}`);
  argDiv.innerHTML = `
        <h4>Command argument #${argcount}</h4>
        <div class="input">
            <label for="argName">Argument Name: </label>
            <input id="argName" type="text" placeholder="arg" title="Name of your argument. Must be alphanumeric and lowercase. Up to 32 characters." maxlength="32" size="30">
        </div>
        <div class="input">
            <label for="argDesc">Argument Description: </label>
            <input id="argDesc" type="text" placeholder="My cool command argument" title="Description of your argument. Up to 100 characters." maxlength="100" size="50">
        </div>
        <div class="input-check">
        <label for="argOptional">Optional? </label>
        <input id="argOptional" type="checkbox" placeholder="argument" title="Check if this argument should be optional, uncheck to require setting this argument">
        </div>
  `;
  document.getElementById("args").append(argDiv);
}


function copy() {
  var copyText = document.getElementById("output").innerText;
  //copy the text to clipboard
    navigator.clipboard.writeText(copyText);

}