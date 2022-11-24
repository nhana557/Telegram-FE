/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import defaultPhoto from '../assets/default.jpg';
import './chat.css'
import Swal from 'sweetalert2';

export default function Chat({
  activeReceiver,
  detailReceiver,
  listChat,
  onSendMessage,
  message,
  setMessage,
  onDeleteMessage,
  onEditMessage,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleOPts = (e) =>{
    const opts= document.querySelectorAll("#toggle-Opts")
    var month = document.querySelectorAll("#baloonRight"),
    startMonth;

for (var i=0; i<month.length; i++) {
    month[i].index = i;

    month[i].addEventListener("click", function () {
        // alert(this.index);
        // console.log(this.index)
        opts[this.index].classList.toggle('d-flex')
        opts[this.index].classList.toggle('d-none')
    });
}
    // e.target.classList.toggle('d-none')
    // e.target.classList.toggle('d-flex')
    // console.log(opts.index)
  }
  const [editChat, setEditChat] = useState('');
  const [editChatData, setEditChatData] = useState(null);
  // console.log(listChat);
  
  return (
    
    <>
      {activeReceiver ? (
        <div className="chat-menu col-8 col-md-9 p-0 m-0 d-flex flex-column justify-content-between">
          <div className="chat-menu-header bg-white py-3 px-5">
            <div className="d-flex">
              {detailReceiver.isLoading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  {detailReceiver.data.photo ? (
                    <img
                      className="profile-rounded pointer"
                      src={`https://drive.google.com/uc?export=view&id=${detailReceiver.data.photo}`}
                      alt="Gambar Profile"
                      onClick={toggleDrawer}
                    />
                  ) : (
                    <img
                      className="profile-rounded pointer"
                      src={defaultPhoto}
                      alt="Gambar Profile"
                      onClick={toggleDrawer}
                    />
                  )}
                  <div className="ms-3 pointer" onClick={toggleDrawer}>
                    <p className="fw-bold m-0 p-0">
                      {detailReceiver.data.username}
                    </p>
                    <p className="fw-bold color-blue m-0 p-0">
                      <small>Online</small>
                    </p>
                  </div>
                  <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction="right"
                    className="bla bla bla"
                    size={300}
                  >
                    <div className="p-3">
                      <div className="profile mt-4 profile">
                        <div className="position-relative">
                          {detailReceiver.data.photo ? (
                            <img
                              className="profile-rounded"
                              src={`https://drive.google.com/uc?export=view&id=${detailReceiver.data.photo}`}
                              alt="Gambar Profile"
                            />
                          ) : (
                            <img
                              className="profile-rounded"
                              src={defaultPhoto}
                              alt="Gambar Profile"
                            />
                          )}
                        </div>
                        <h5 className="fw-bold mt-3">
                          {detailReceiver.data.username}
                        </h5>
                        <p>{detailReceiver.data.email}</p>
                        <div className="w-100 mt-3">
                          {
                            detailReceiver.data.phone && (
                            <div>
                            <h6 className='mb-3 ms-3'>
                              <b>Phone Number</b>
                            </h6>
                            <p className='ms-3'>
                              {detailReceiver.data.phone}
                            </p>   
                            </div>
                            )
                          }
                          {
                            detailReceiver.data.bio && (
                            <p>
                              <b>Bio:</b>
                              {' '}
                              {detailReceiver.data.bio}
                            </p>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </>
              )}
            </div>
          </div>
          <div className="chat-menu-message p-4" id="chatMenuMessage">
            {detailReceiver.isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                {listChat.length ? (
                  <>
                    {listChat.map((chat, index ) => 
                    (
                      
                      <div key={chat.id}>
                        {chat.sender_id === localStorage.getItem('id') ? (
                          <div>
                            <div className="d-flex justify-content-end align-items-end mt-4 "
                            >
                              <button className="ballon-right me-2 content-chat border"
                              onClick={handleOPts}
                              value={index}
                              id="baloonRight"
                              >
                                {chat.is_deleted ? (
                                  <p className="p-0 m-0 text-secondary">
                                    <i>This message has been deleted</i>
                                  </p>
                                ) : (
                                  <>
                                    <p className="p-0 m-0 p-content" >{chat.chat}</p>
                                    <small
                                      
                                      className="text-secondary"
                                      style={{ fontSize: '13px' }}
                                    >
                                      {moment(chat.date).format('LLL')}
                                    </small>
                                  </>
                                )}
                              </button>
                              {chat.photo ? (
                                <img
                                  className="profile-rounded"
                                  src={`https://drive.google.com/uc?export=view&id=${chat.photo}`}
                                  alt="Gambar Profile"
                                />
                              ) : (
                                <img
                                  className="profile-rounded"
                                  src={defaultPhoto}
                                  alt="Gambar Profile"
                                />
                              )}
                            </div>
                            {!chat.is_deleted && (
                              <div
                                className="d-flex justify-content-end w-100 balunHijau"
                                style={{ marginTop: '-12px' }}
                                id='toggle-Opts'
                                
                              >
                                <button
                                  className="text-primary pointer mt-3 me-2 btn-custom"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editChat"
                                  onClick={() => {
                                    setEditChat(chat.chat);
                                    setEditChatData(chat);
                                  }}
                                >
                                  Edit
                                </button>

                                <div className="modal fade" id="editChat" tabIndex="-1" aria-labelledby="editChatLabel" aria-hidden="true">
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="editChatLabel">Edit Chat</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                      </div>
                                      <div className="modal-body">
                                        <input className="form-control" type="text" value={editChat} onChange={(e) => setEditChat(e.target.value)} />
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="close">Close</button>
                                        <button type="button" className="btn bg-blue text-white" onClick={() => onEditMessage(editChat, editChatData)}>Save changes</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="text-danger pointer mt-3 btn-custom"
                                  onClick={() => onDeleteMessage(chat)}
                                  style={{ marginRight: '65px' }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="d-flex justify-content-start align-items-end mt-4">
                            {chat.photo ? (
                              <img
                                className="profile-rounded"
                                src={`https://drive.google.com/uc?export=view&id=${chat.photo}`}
                                alt="Gambar Profile"
                              />
                            ) : (
                              <img
                                className="profile-rounded"
                                src={defaultPhoto}
                                alt="Gambar Profile"
                              />
                            )}
                            <div className="ballon-left ms-2 content-chat">
                              {
                                chat.is_deleted ? (
                                  <p className="p-0 m-0 text-light">
                                    <i>This message has been deleted</i>
                                  </p>
                                ) : (
                                                                    
                                  <>
                                  
                                    <p className="p-0 m-0">{chat.chat}</p>
                                    <small
                                      className="text-light"
                                      style={{ fontSize: '13px' }}
                                      >
                                      {moment(chat.date).format('LLL')}
                                    </small>
                                  </>
                                )
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="chat-menu-blank">
                    <p className="fs-5 text-secondary ">{`send message to ${detailReceiver.data.username}`}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="chat-menu-form bg-white py-3 px-5">
            <form onSubmit={onSendMessage}>
              <div className="input-group">
                <input
                  className="form-control bg-light border-0 input-message"
                  id="message"
                  placeholder="Type your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="btn text-white bg-blue">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="chat-menu col-8 col-md-9 d-flex flex-column">
          <div className="chat-menu-blank p-4">
            <h5 className="text-secondary">
              Please select a chat to start messaging
            </h5>
          </div>
        </div>
      )}
    </>
  );
}
