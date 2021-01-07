const replace_assets = (text, paths) => {
  var newText = text
  var asset;
  for (asset in paths){
    var regex = new RegExp("[.]*[/]*assets/" + asset, "g")
    newText = newText.replace(regex, paths[asset])
  }
  return newText
}

export default replace_assets