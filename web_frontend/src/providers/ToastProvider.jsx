import { createContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';


export const ToastContext = createContext([]);


export function ToastProvider({ children }) {
    const [messages, setMessages] = useState([]);

    const sendToastMessage = (text) => {
      setMessages([ ...messages, { text } ]);

      setTimeout(() => {
        closeMessage(text)
      }, 10 * 1000);
    }

    const closeMessage = (text) => {
      setMessages(messages.filter(m => m.text !== text));
    }

    return (
      <ToastContext.Provider value={{ sendToastMessage }}>
        {messages.map(m => (
          <Modal.Dialog>
            <Modal.Header closeButton onHide={closeMessage(m.text)}>
              {m.text}
            </Modal.Header>
          </Modal.Dialog>
        ))}
        {children}
      </ToastContext.Provider>
    );
}
