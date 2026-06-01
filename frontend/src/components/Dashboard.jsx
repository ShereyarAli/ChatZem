import React, { useState } from 'react'

const friends = [
  { id: 1, name: 'Mira Patel', status: 'Online', message: 'Hey, are we still on for tonight?' },
  { id: 2, name: 'Noah Clark', status: 'Away', message: 'I just sent the file.' },
  { id: 3, name: 'Ava Nguyen', status: 'Online', message: 'Let me know when you are free.' },
  { id: 4, name: 'Eli Brooks', status: 'Offline', message: 'Catch you later!' },
  { id: 5, name: 'John Doe', status: 'Online', message: 'Thanks' },
]

const chatThreads = {
  1: [
    { from: 'them', text: 'Hey! Ready to catch up later?', time: '9:08 AM' },
    { from: 'me', text: 'Yes, that works great. See you at 8.', time: '9:10 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
    { from: 'me', text: 'Yes, that works great. See you at 8.', time: '9:10 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
    { from: 'me', text: 'Yes, that works great. See you at 8.', time: '9:10 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
    { from: 'me', text: 'Yes, that works great. See you at 8.', time: '9:10 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
    { from: 'them', text: 'Perfect. I’ll bring the notes.', time: '9:11 AM' },
  ],
  2: [
    { from: 'them', text: 'I uploaded the latest draft to the workspace.', time: '11:05 AM' },
    { from: 'me', text: 'Thanks, I’ll review it by afternoon.', time: '11:07 AM' },
  ],
  3: [
    { from: 'them', text: 'Can you take a quick look at the new design?', time: '2:22 PM' },
    { from: 'me', text: 'Looks great! I have one small suggestion.', time: '2:26 PM' },
  ],
  4: [
    { from: 'them', text: 'I’m heading offline now. Talk tomorrow!', time: '6:01 PM' },
  ],
}

const Dashboard = () => {
  const [activeId, setActiveId] = useState(1)
  const activeFriend = friends.find((friend) => friend.id === activeId)
  const thread = chatThreads[activeId] || []

  return (
    <div className="dashboard-page">
      <div className="dashboard-frame">
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-header">
            <div>
              <p className="dashboard-small-label">Friends</p>
              <h2 className="dashboard-title">Chats</h2>
            </div>
            <span className="dashboard-badge">{friends.length}</span>
          </div>

          <div className="dashboard-friend-list">
            {friends.map((friend) => {
              const active = friend.id === activeId
              return (
                <button
                  key={friend.id}
                  className={`friend-item${active ? ' active' : ''}`}
                  onClick={() => setActiveId(friend.id)}
                  type="button"
                >
                  <div>
                    <p className="friend-name">{friend.name}</p>
                    <p className="friend-message">{friend.message}</p>
                  </div>
                  <span className={`status-dot status-${friend.status.toLowerCase()}`} />
                </button>
              )
            })}
          </div>
        </aside>

        <section className="dashboard-chat-panel">
          <div className="dashboard-chat-header">
            <div>
              <p className="dashboard-small-label">Active chat</p>
              <h2 className="chat-title">{activeFriend.name}</h2>
            </div>
            <div className="presence-bubble">
              <span className={`status-dot status-${activeFriend.status.toLowerCase()}`} />
              <span className="presence-label">{activeFriend.status}</span>
            </div>
          </div>

          <div className="messages-pane">
            {thread.map((message, index) => (
              <div
                key={index}
                className={`message-bubble ${message.from === 'me' ? 'me' : 'them'}`}
              >
                <p className="message-text">{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            ))}
          </div>

          <div className="input-bar">
            <input
              type="text"
              placeholder="Write a message…"
              className="chat-input"
              disabled
            />
            <button type="button" className="send-button" disabled>
              Send
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
