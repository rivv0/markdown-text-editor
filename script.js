

const themeBtn= document.querySelector('.theme');
const textInput= document.querySelector('#text-input');
const markdown_preview= document.querySelector('#markdown-preview');
const sections= document.querySelectorAll('section')
const headings= document.querySelectorAll('.heading')

themeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    themeBtn.textContent= (document.body.classList.contains('dark')?'☀️':'🌙');
    themeBtn.classList.toggle('dark')
    sections[0].classList.toggle('dark')
    sections[1].classList.toggle('dark')
    headings[0].classList.toggle('dark')

    themeBtn.classList.toggle('dark')
})

textInput.addEventListener('input', (e)=>{
    let content= e.target.value;
    content= convert(content);
    markdown_preview.innerHTML= content;
})

function convert(content){
    let h1= /^#[^#].*$/gm;

    if (h1.test(content)) {
        const matches = content.match(h1) 
      
        matches.forEach((element) => {
          const extractedText = element.slice(1)
          
          content = content.replace(element, `<h1>${extractedText}</h1>`)
          
        })
      }

      let h2= /^##[^#].*$/gm;

      if (h2.test(content)) {
        const matches = content.match(h2) 
        matches.forEach((element) => {
          const extractedText = element.slice(2) 
          content = content.replace(element, `<h2>${extractedText}</h2>`)
          
        })
      }

      let bold= /\*\*[^\*\n]+\*\*/gm;

      if (bold.test(content)) {
        console.log(content);
        const matches = content.match(bold)
        matches.forEach((element) => {
          const extractedText = element.slice(2, -2) 
          content = content.replace(element, `<strong>${extractedText}</strong>`)
        })
      }

      let highlight= /==[^==\n]+==/gm;

      if (highlight.test(content)) {
        const matches = content.match(highlight)
        matches.forEach((element) => {
          const extractedText = element.slice(2, -2) 
          content = content.replace(
            element,
            `<span class="highlight">${extractedText}</span>`,
            
          )
        })
      }

      let italics= /[^\*]\*[^\*\n]+\*/gm

      if (italics.test(content)) {
        const matches = content.match(italics)
        matches.forEach((element) => {
          const extractedText = element.slice(2, -1)
          
          content = content.replace(element, `<em>${extractedText}</em>`)
        })
      }

      let link= /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm

      if (link.test(content)) {
        const links = content.match(link)
        
        links.forEach((element) => {
          const text = element.match(/^\[.*\]/)[0].slice(1, -1) 
          const url = element.match(/\]\(.*\)/)[0].slice(2, -1)
          
          content = content.replace(element, `<a href="${url}">${text}</a>`)
        })
      }

      let lists= /^(\s*(\-|\d\.) [^\n]+)+$/gm

      if (lists.test(content)) {
        const matches = content.match(lists)
      
        matches.forEach((list) => {
          const listArray = list.split('\n')
          
          const formattedList = listArray
            .map((currentValue, index, array) => {
              if (unorderedList.test(currentValue)) {
                currentValue = `<li>${currentValue.slice(2)}</li>`
      
                if (!unorderedList.test(array[index - 1])) {
                  
                  currentValue = '<ul>' + currentValue
                  
                }
                if (!unorderedList.test(array[index + 1])) {
                  
                  currentValue = currentValue + '</ul>'
                  
                }
              }
              
              if (orderedList.test(currentValue)) {
                currentValue = `<li>${currentValue.slice(2)}</li>`
      
                if (!orderedList.test(array[index - 1])) {
                  currentValue = '<ol>' + currentValue
                }
      
                if (!orderedList.test(array[index + 1])) {
                  currentValue = currentValue + '</ol>'
                }
              }
      
              return currentValue
            })
            .join('')
      
          content = content.replace(list, formattedList)
        })
      }

      content = content
                .split('\n')
                .map((line) => {
                    if (!line.startsWith('<') && line !== '') {
                    
                    return line.replace(line, `<p>${line}</p>`)
                    } else {
                    return line
                    }
                })
                .join('\n')

    return content;
}