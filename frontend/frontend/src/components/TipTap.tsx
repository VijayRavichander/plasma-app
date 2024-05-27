import { useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import TipTapMenuBar from './TipTapMenu'


const Tiptap = ({}: {}) => {

  const [editorState, setEditorState] = useState("")
  const [editorText, setEditorText] = useState("")

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({editor}) => {
      setEditorState(editor.getHTML());
      setEditorText(editor.getText());
    },
  })

  return (
    <div className='mx-10'>
      {editor && <TipTapMenuBar editor={editor} />}
      <div className='border'>
        <div className='prose'>
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className='prose'>
        <div dangerouslySetInnerHTML={{ __html: editorState }}  />
      </div>
    </div>
  )
}

export default Tiptap