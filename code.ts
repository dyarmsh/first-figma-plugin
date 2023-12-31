figma.showUI(__html__);
figma.ui.resize(500, 500);

figma.ui.onmessage = async(pluginMessage) => {

  await figma.loadFontAsync({ family: "Rubik", style: "Regular"});

  // finding the correct node
  const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
  let selectedVariant;

  if (pluginMessage.darkModeState){
      switch (pluginMessage.imageVariant) {
        case "2":
          selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
          break;
        case "3":
          selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
          break;
        default :
          selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
          break;
      }
    } else {
      switch (pluginMessage.imageVariant) {
        case "2":
          selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
          break;
        case "3":
          selectedVariant = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
          break;
        default:
          selectedVariant = postComponentSet.defaultVariant as ComponentNode;
          break;
      }
  }

  const newPost = selectedVariant.createInstance();

  const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
  const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
  const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;

  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;

  figma.closePlugin();
}