function getAutoCompleteSuggestions(query: string){
  console.log("Calling AUTOCOMPLETE API", query)
}

let timeoutId;
function debounceFunction(fn: function, debounceTime: int){
  // return a better function
  return function(...args){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, debounceTime);
  }
}

const getAutoCompleteSuggestionsDebounced = debounceFunction(getAutoCompleteSuggestions, 2000);
