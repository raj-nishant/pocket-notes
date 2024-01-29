import React, { useState, useEffect } from 'react';
import Modal from './PopUp';
import Notes from './Notes';
import banner from '../assets/Banner.png';
import lock from '../assets/lock.png';
import './Home.css';

const SideBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);

    const fetchGroup = async () => {
      let storedGroups = localStorage.getItem('groups');
      if (storedGroups) {
        let groups = await JSON.parse(storedGroups);
        setGroups(groups);
      }
    };
    fetchGroup();
  }, []);

  const handleClick = (group) => {
    setGroupSelect(group);
  };


  return (
    <>
      {screenSize.width < 989 ? (
        <div className="sidebarContainerMobile">
          {groupSelect ? (
            <Notes
              groupSelect={groupSelect}
              groups={groups}
              setGroups={setGroups}
            />
          ) : (
            <>
              <h1 className="headingMobile">Pocket Notes</h1>
              <button
                className="CreateButtonMobile"
                onClick={() => setOpenModal(true)}
              >
                +
              </button>
              <div className="GroupList">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`groupItem ${groupSelect === group ? 'selected' : ''
                      }`}
                    onClick={() => handleClick(group)}
                  >
                    <div
                      className="groupIcon"
                      style={{ background: group.color }}
                    >
                      
                      {group.groupName
                      .split(' ').length===1
                      ?group.groupName.slice(0, 2).toUpperCase()
                      :group.groupName.split(' ')  
                      .map((word,index) => index < 2 ? word[0] : '')  
                      .join('')
                      .toUpperCase()
                    }
                    </div>
                    <h2 className="groupName">{group.groupName}</h2>
                  </div>
                ))}
              </div>
            </>
          )}

          {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
        </div>
      ) : (
        <>
          <div className="sidebarContainer">
            <h1 className="heading">Pocket Notes</h1>
            <button className="CreateButton" onClick={() => setOpenModal(true)}>
              +
            </button>
            <div className="GroupList">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`groupItem ${groupSelect === group ? 'selected' : ''
                    }`}
                  onClick={() => handleClick(group)}
                >
                  <div
                    className="groupIcon"
                    style={{ background: group.color }}
                  >
                    {group.groupName
                      .split(' ').length===1
                      ?group.groupName.slice(0, 2).toUpperCase()
                      :group.groupName.split(' ')  
                      .map((word,index) => index < 2 ? word[0] : '')  
                      .join('')
                      .toUpperCase()
                    }
                  </div>
                  <h2 className="groupName">{group.groupName}</h2>
                </div>
              ))}
            </div>
          </div>
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
          <div className="MessageAreaContainer">
            {groupSelect ? (
              <Notes
                groupSelect={groupSelect}
                groups={groups}
                setGroups={setGroups}
              />
            ) : (
              <>
                <div className="MessageAreaText">
                  <img src={banner} alt="banner"></img>
                  <h1 className="MessageAreaHeading">Pocket Notes</h1>
                  <p className="MessageAreaDescription">
                    Send and receive messages without keeping your phone online.
                    <br /> Use Pocket Notes on up to 4 linked devices and 1
                    mobile phone
                  </p>
                </div>
                <footer className="MessageAreaFooter">
                  <img src={lock} alt="lock"></img>&nbsp;
                  end-to-end encrypted
                </footer>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
