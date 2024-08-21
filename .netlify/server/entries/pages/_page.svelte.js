import { c as create_ssr_component, o as onDestroy, v as validate_component, f as each, h as add_attribute, e as escape } from "../../chunks/ssr.js";
import { I as Icon } from "../../chunks/Icon.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let finalTranscript = "";
  let voices = [];
  let balance = 45e3;
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    }
  });
  async function sayIt(msg) {
  }
  function startRecognition() {
    finalTranscript = "";
  }
  async function stopRecognition() {
  }
  async function withdrawPrompt() {
    var prompt = finalTranscript.toLocaleLowerCase().replace("withdraw", "").replace("naira", "").replace(",", "");
    var amount = parseFloat(prompt);
    if (amount) {
      if (balance > amount) {
        sayIt().then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          await sayIt();
          await sayIt();
        });
        balance = balance - amount;
      } else {
        sayIt();
      }
    } else {
      sayIt();
    }
  }
  async function depositPrompt() {
    var prompt = finalTranscript.toLocaleLowerCase().replace("deposite", "").replace("deposites", "").replace("deposit", "").replace("naira", "").replace(",", "");
    var amount = parseFloat(prompt);
    if (amount) {
      sayIt().then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        balance += amount;
        await sayIt();
      });
    } else {
      sayIt();
    }
  }
  function handleKeydown(event) {
    finalTranscript = "";
    startRecognition();
  }
  function handleKeyup(event) {
    stopRecognition();
  }
  {
    {
      if (finalTranscript !== "") {
        let prompt = finalTranscript.toLocaleLowerCase();
        switch (true) {
          case prompt == "cancel":
            sayIt();
            break;
          case (prompt == "start" || "starts"):
            sayIt().then(() => {
              sayIt();
            });
            break;
          case prompt == "repeat instruction":
            sayIt();
            break;
          case (prompt == "balance" || "acccount balance"):
            sayIt();
            break;
          case (prompt.includes("withdraw") || prompt.includes("withdraws")):
            withdrawPrompt();
            break;
          case (prompt.includes("deposite") || prompt.includes("deposites") || prompt.includes("deposit")):
            depositPrompt();
            break;
          default:
            sayIt();
            break;
        }
        finalTranscript = "";
      }
    }
  }
  return `<div class="variant-soft-surface h-full w-full flex flex-col justify-center items-center gap-5"><p class="h1" data-svelte-h="svelte-12ue2id">Welcome back 👋</p> <p class="h3" data-svelte-h="svelte-69lukl">Mr Mattew</p> ${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "fluent:mic-pulse-48-filled",
      width: "4em",
      height: "4em",
      class: "text-primary-500  "
    },
    {},
    {}
  )} <div class="flex flex-row items-center justify-center gap-2"><p class="font-medium" data-svelte-h="svelte-jevmv0">Voice:</p> <select class="form-select input block text-white mt-1 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50" ${"disabled"}>${each(voices, (voice, i) => {
    return `<option${add_attribute("value", i, 0)}>${escape(voice.name)} (${escape(voice.lang)})</option>`;
  })}</select></div>   ${``} </div>`;
});
export {
  Page as default
};
