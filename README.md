# Vuetify Blog  Mini Docs

Priorities for this MVP
- [x] Support CRUD
- [x] Support storage across sessions
- [x] Add component test and visual test

Nice to Haves (not prioritised) 
- [ ] Make the website more beautiful

# Home Page Screenshot 
<img width="1773" alt="image" src="https://github.com/user-attachments/assets/cf76431b-fbd1-46c3-a4fe-0890b3cbcd9f" />

# Secondary Priorities 
Practically speaking, not every part of my secondary priorities are necessary for every project. I am not a purist neither do I have strong opinions about them. But I have found them very helpful in the past.
## Document and Test Components

<p> I used storybook for visual testing and component documentation. It wasn't absolutely necessary for a project of this size/purpose, but merely a demonstration of how I prefer to document my components when collaborating with designers and product managers. Storybook is a good designer-developer documentation and testing tool.</p>

<blockquote>The whole app/page doesn't need to be ready to understand how distinct components will look, feel and work.</blockquote>
  
<img width="903" alt="image" src="https://github.com/user-attachments/assets/0b9560e3-d016-4b59-8e9f-0df12a8bbfdc" />

<img width="1131" alt="image" src="https://github.com/user-attachments/assets/a0a7b139-fa36-43ad-9d31-be36dcd351fd" />

## Modular Architecture & File Organisation
<p>Screaming architecture is a style of organising files that allow the intent of the app to be visible at a high level. 
I have introduced non-standard-vue-project folders like features and arranged contents in them to immediately hint at what the app is about.</p>

<p>Some frameworks benefit from conventions such as directory naming e.g '/components', '/layouts', '/pages', '/store', '/router', '/plugins etc. 
While screaming Architecture goes a step further by making the intent of the app visible at a high level, it might be a bit "different" or "strange" for people who are used to working
with conventionally scaffolded projects</p>

- [x] Related features stay together - this adheres to principle of proximity. So while this is not also very conventional, I have found it helpful in the past for very large projects
- [x] Tests and stories are closer to the components (I've found this helpful for very large projects 10k+ components.


<img src="https://miro.medium.com/v2/resize:fit:1400/1*Tivq9b-eXo9NqBLhrwLMIQ.png" style="margin-top:20px">
Photo credit: https://miro.medium.com/v2/resize:fit:1400/1*Tivq9b-eXo9NqBLhrwLMIQ.png
