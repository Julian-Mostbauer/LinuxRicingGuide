export default class Component {
    componentCode = ''
    componentId = ''

    constructor(componentCode, componentId) {
        this.componentCode = componentCode
        this.componentId = componentId
    }

    placeComponent() {
      console.debug('Placing component:', this.componentId);
      
      // Ensure the target element exists
      const targetElement = document.getElementById(this.componentId);
      if (!targetElement) {
          console.error(`Element with ID "${this.componentId}" not found.`);
          return;
      }
  
      // Create a template and set its HTML
      const template = document.createElement('template');
      template.innerHTML = this.componentCode.trim();
  
      // Replace the target element with the template's content
      const content = template.content.cloneNode(true); // Clone the entire content
      targetElement.replaceWith(content);
  }
  
}
