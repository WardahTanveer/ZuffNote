//@/services/storage.js

import AsyncStorage from "@react-native-async-storage/async-storage";
//also import stuff from defaultData.json or .js, whatever works

//Storage keys
const keys = {
    notes: "@zuffnote/notes",
    groups: "@zuffnote/groups",
    themes: "@zuffnote/themes",
    settings: "@zuffnote/settings" //will contain maxEditHistory (int), auto-sync (bool), email (string) (option to add or change), language (string), notifications (bool) etc. There will also be a corresponding default 'settings' in defaultData.json
};

//Helper functions
const nowDate = ()=>{
    return new Date().toISOString().split("T")[0];
};
const nowTime = ()=>{
    return new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
};

//Notes
export async function loadNotes(){
    const raw = await AsyncStorage.getItem(keys.notes);
    return raw ? JSON.parse(raw) : [];
};
export async function storeNotes(notes){
    await AsyncStorage.setItem(keys.notes, JSON.stringify(notes));
};
export async function createNote({groups=[]}){
    const notes = await loadNotes();
    const id = Date.now().toString();
    const note = {
        id,
        groups,
        createdAt: {
            date: nowDate(),
            time: nowTime()
        },
        editHistory: [
            {
                id: `${id}.0`,
                date: nowDate(),
                time: nowTime(),
                locked: false,
                content: []
            }
        ]
    }
    notes.unshift(note);
    await storeNotes(notes);
    return note;
};
export async function addNoteTheme(noteId, theme){
    const notes = await loadNotes();
    const idx = notes.findIndex(n => n.id===noteId);
    if(idx===-1){ 
        return; 
    }
    notes[idx].theme = theme;
    await storeNotes(notes);
};
export async function addNoteEdit(noteId, content){
    const notes = await loadNotes();
    const idx = notes.findIndex(n => n.id===noteId);
    if(idx===-1){ 
        return; 
    }
    const versionId = notes[idx].editHistory.length;
    notes[idx].editHistory.unshift({
        id: `${noteId}.${versionId}`,
        date: nowDate(),
        time: nowTime(),
        locked: false,
        content
    });
    const settings = await loadSettings();
    const max = settings.maxEditHistory ?? 20;
    notes[idx].editHistory = notes[idx].editHistory.slice(0, max);
    await storeNotes(notes);
};
export async function editNoteGroups(noteId, groups){
    const notes = await loadNotes();
    const idx = notes.findIndex(n => n.id === noteId);
    if(idx===-1){
        return;
    }
    notes[idx].groups = groups;
    await storeNotes(notes);
};
export async function deleteNote(noteId){
    const notes = await loadNotes();
    const idx = notes.findIndex(n => n.id === noteId);
    if(idx===-1){
        return;
    }
    if(notes[idx].editHistory.find(e => e.locked)){
        //Add message: A note edit is locked
        return;
    }
    const filteredNotes = notes.filter(n => n.id!==noteId);
    await storeNotes(filteredNotes);
};
export async function deleteNoteEdit(noteId, editId=null){
    const notes = await loadNotes();
    const noteIdx = notes.findIndex(n => n.id === noteId);
    if(noteIdx===-1){
        return;
    }
    if(editId){
        const editIdx = notes[noteIdx].editHistory.findIndex(e => e.id===editId);
        if(editIdx===-1){
            return;
        }
        if(notes[noteIdx].editHistory[editIdx].locked){
            //Add message: Note edit is locked
            return;
        }
        notes[noteIdx].editHistory = notes[noteIdx].editHistory.filter(e => e.id!==editId);
    }
    else if(notes[noteIdx].editHistory.length && !(notes[noteIdx].editHistory[notes[noteIdx].editHistory.length-1].locked)){
        notes[noteIdx].editHistory.pop();
    }
    await storeNotes(notes);
};
export async function toggleNoteEditLock(noteId, editId){
    const notes = await loadNotes();
    const noteIdx = notes.findIndex(n => n.id === noteId);
    if(noteIdx===-1){
        return;
    }
    const editIdx = notes[noteIdx].editHistory.findIndex(e => e.id===editId);
    if(editIdx===-1){
        return;
    }
    notes[noteIdx].editHistory[editIdx].locked = !(notes[noteIdx].editHistory[editIdx].locked);
    await storeNotes(notes);
};

//Groups
export async function loadGroups(){
    const raw = await AsyncStorage.getItem(keys.groups);
    return raw ? JSON.parse(raw) : [];
};
export async function storeGroups(groups){
    await AsyncStorage.setItem(keys.groups, JSON.stringify(groups));
};
export async function createGroup(name){
    const groups = await loadGroups();
    const id = Date.now().toString();
    const group = { id, name };
    groups.push(group);
    await storeGroups(groups);
    return group;
};
export async function editGroupName(groupId, newName){
    const groups = await loadGroups();
    const idx = groups.findIndex(g => g.id===groupId);
    if(idx===-1){
        return;
    }
    groups[idx].name = newName;
    await storeGroups(groups);
};
export async function deleteGroup(groupId){
    //remove from groups
    const groups = await loadGroups();
    const filteredGroups = groups.filter(g => g.id!==groupId);
    await storeGroups(filteredGroups);
    //remove from notes
    const notes = await loadNotes();
    notes.forEach(n => {
        n.groups = n.groups.filter(gid => gid!==groupId);
    })
    await storeNotes(notes);
};

//Themes
export async function loadThemes(){
    const raw = await AsyncStorage.getItem(keys.themes);
    return raw ? JSON.parse(raw) : {}; /*pass themes from defaultData.json */
}
export async function storeThemes(themes){
    await AsyncStorage.setItem(keys.themes, JSON.stringify(themes));
}
export async function changeTheme(themeType, theme){
    //themeType can be 'noteTheme', 'appTheme', 'widgetTheme'
    const themes = await loadThemes();
    themes[themeType]=theme;
    await storeThemes(themes);
}

//Settings
export async function loadSettings(){
    const raw = await AsyncStorage.getItem(keys.settings);
    return raw ? JSON.parse(raw) : {}; /*pass settings from defaultData.json */
}
export async function storeSettings(settings){
    await AsyncStorage.setItem(keys.settings, JSON.stringify(settings));
}

//Reset
export async function wipeStorage(){
    await AsyncStorage.multiRemove(Object.values(keys));
};