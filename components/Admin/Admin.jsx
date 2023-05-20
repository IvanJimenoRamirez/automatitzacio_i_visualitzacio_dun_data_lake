"use client";

// Imports
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

//Components
import { Loader } from "../../components/loader";
import { Table } from "../../components/Admin/Table/Table";
import { Modal } from "../../components/Modal/Modal";
import { Error } from "../Error/Error";

// Styles
import styles from "./Admin.module.css";

// Icons
import newIcon from "../../public/icons/admin/new.svg";
import copyIcon from "../../public/icons/admin/copy.svg";
import deleteIcon from "../../public/icons/admin/delete.svg";
import editIcon from "../../public/icons/admin/edit.svg";

export function AdminContent({ lang, dict }) {
  const [showResult, setShowResult] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetched Data
  const [users, setUsers] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalActions, setModalActions] = useState([]);

  // Error
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  // Session
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      updateUsers();
      updateApiKeys();
    }
  }, [session]);


  const handleRefreshEndpoints = () => {
    let loader = document.querySelector(`#loader`);
    let button = document.querySelector(`.${styles.refreshEndpoints} button`);
    button.classList.toggle(styles.hidden);
    loader.classList.toggle(styles.hidden);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/updateEndpoints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((data) => {
        let message = "";
        if (res.status === 200) {
          message = dict.page.admin.endpointConfig.success;
          setIsError(false);
        } else {
          message = dict.page.admin.endpointConfig.error + res.status;
          setIsError(true);
        }
        loader.classList.toggle(styles.hidden);
        button.classList.toggle(styles.hidden);
        setShowResult(message);
        setTimeout(hideResult, 3000);
      })
    ).catch((err) => {
      setErrorMessage(err.message);
      setErrorStatus(500);
      button.classList.toggle(styles.hidden);
      loader.classList.toggle(styles.hidden);
  });
  };

  /* MODAL SETUPS */

  const deleteConfirmationModal = (title, description, callback, ...params) => {
    setModalTitle(title);
    setModalContent(<p>{description}</p>);
    setModalActions([
      { label: dict.commons.cancel, onClick: () => setModalOpen(false) },
      {
        label: dict.page.admin.delete,
        onClick: () => {
          callback(...params);
          setModalOpen(false);
        },
      },
    ]);
    setModalOpen(true);
  };

  const createUserModal = () => {
    setModalTitle(dict.page.admin.manageUsers.create);
    setModalContent(
      <form id="createUserForm">
        <div>
          <label htmlFor="name">{dict.page.profile.userData.name}</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">{dict.page.profile.userData.email}</label>
          <input type="text" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">{dict.page.profile.userData.password}</label>
          <input type="password" id="password" name="password" />
        </div>
      </form>
    );
    setModalActions([
      { label: dict.commons.cancel, onClick: () => setModalOpen(false) },
      {
        label: dict.page.admin.add,
        onClick: () => {
          let form = document.getElementById("createUserForm");
          let inputs = form.querySelectorAll("input");
            let body = {};
            inputs.forEach((input) => {
                body[input.name] = input.value;
            });
            performFetch(
                `/users`,
                "POST",
                body,
                updateUsers
            );
          setModalOpen(false);
        },
      },
    ]);
    setModalOpen(true);
  }

  const updateUserModal = (user) => {
    setModalTitle(dict.page.admin.manageUsers.edit);
    setModalContent(
      <form id="updateUserForm">
        <div>
          <label htmlFor="name">{dict.page.profile.userData.name}</label>
          <input type="text" id="name" name="name" placeholder={user.name} />
        </div>
        <div>
          <label htmlFor="email">{dict.page.profile.userData.email}</label>
          <input type="text" id="email" name="email" placeholder={user.email} />
        </div>
        <div>
          <label htmlFor="password">{dict.page.profile.userData.password}</label>
          <input type="text" id="password" name="password" placeholder="New password" />
        </div>
        <div>
          <label htmlFor="role_id">{dict.page.profile.userData.role}</label>
          <input type="number" id="role_id" name="role_id" placeholder={user.role_id} />
        </div>
      </form>
    );
    setModalActions([
      { label: dict.commons.cancel, onClick: () => setModalOpen(false) },
      {
        label: dict.page.admin.edit,
        onClick: () => {
          let form = document.getElementById("updateUserForm");
          let inputs = form.querySelectorAll("input");
            let body = {};
            inputs.forEach((input) => {
                body[input.name] = (input.value === "" && input.name !== "password") ? input.placeholder : input.value;
            });
            performFetch(
                `/users/${user.id}`,
                "PUT",
                body,
                updateUsers
            );
          setModalOpen(false);
        },
      },
    ]);
    setModalOpen(true);
  }

  const hideResult = () => {
    setShowResult(false);
  };

  /* Table actions */
  const userColumns = [dict.commons.name, dict.page.profile.userData.email, dict.page.profile.userData.role, dict.commons.action];
  const userColumnsName = ["name", "email", "role_id", "actions"];
  const apiKeysColumns = ["Id", "Api Key", dict.commons.action];
  const apiKeysColumnsName = ["id", "api_key", "actions"];

  const userActions = [
    {
      label: dict.page.admin.edit,
      icon: editIcon,
      onClick: (user) => {
        updateUserModal(user);
      },
    },
    {
      label: dict.page.admin.delete,
      icon: deleteIcon,
      onClick: (user) => {
        deleteConfirmationModal(
          dict.page.admin.manageUsers.delete,
          dict.page.admin.manageUsers.deleteConfirmation + user.name + "?",
          performFetch,
          `/users/${user.id}`,
          "DELETE",
            "{}",
            updateUsers
        );
      },
    },
  ];
  const apiKeysActions = [
    {
      label: dict.page.admin.delete,
      icon: deleteIcon,
      onClick: (apiKey) => {
        deleteConfirmationModal(
            dict.page.admin.manageApiKeys.delete,
            dict.page.admin.manageApiKeys.deleteConfirmation + apiKey.api_key + "?",
            performFetch,
            `/apiKeys/${apiKey.id}`,
            "DELETE",
            "{}",
            updateApiKeys
        );
      },
    },
    {
      label: dict.page.admin.copy,
      icon: copyIcon,
      onClick: (apiKey) => {
        navigator.clipboard.writeText(apiKey.api_key);
        setShowResult(dict.page.admin.manageApiKeys.copySuccess + " ✅");
        setTimeout(hideResult, 3000);
      },
    },
  ];

  /* End Table actions */

  /*  FETCHS  */

  const performFetch = (url, method, body, callback) => {
    if (!session || !session.accessToken) {
      setErrorMessage("Unauthorized");
      setErrorStatus(401);
      return;
    }
    if (["POST", "PUT"].includes(method)) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI${url}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.status === 200) {
                setShowResult(dict.commons.success + " ✅");
                setTimeout(hideResult, 3000);
                callback();
            }
        }).catch((err) => {
          setErrorMessage(err.message);
          setErrorStatus(500);
      });
    } else {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI${url}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
            },
        }).then((res) => {
            if (res.status === 200) {
                setShowResult(dict.commons.success + " ✅");
                setTimeout(hideResult, 3000);
                callback();
            }
        }).catch((err) => {
          setErrorMessage(err.message);
          setErrorStatus(500);
        });
    }
    };

  // GETTERS
  const updateUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        if (res.status === 200) {
          setUsers(data);
        } else {
          setErrorMessage(res.statusText);
          setErrorStatus(res.status);
        }
      })
    ).catch((err) => {
      setErrorMessage(err.message);
      setErrorStatus(500);
    });
  };
  const updateApiKeys = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/apiKeys`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        if (res.status === 200) {
          setApiKeys(data);
        } else {
          setErrorMessage(res.statusText);
          setErrorStatus(res.status);
        }
      })
    ).catch((err) => {
      setErrorMessage(err.message);
      setErrorStatus(500);
    });
  };
  // POST
  const createApiKey = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/DataLakeAPI/apiKeys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setShowResult(dict.commons.success + " ✅");
        setTimeout(hideResult, 3000);
        updateApiKeys();
      } else {
        setErrorMessage(res.statusText);
        setErrorStatus(res.status);
      }
    }).catch((err) => {
      setErrorMessage(err.message);
      setErrorStatus(500);
    });
  }

  return (
    <>
      {errorMessage ? <Error status={errorStatus} message={errorMessage} action={() => { setErrorMessage(false); setErrorStatus(false) }} dict={dict} lang={lang} /> : ""}
      <div>
        <div>
          <h4>{dict.page.admin.manageUsers.title}</h4>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <h5>{dict.page.admin.manageUsers.list}</h5>
              <button onClick={e => createUserModal()}>
                <span>+ {dict.page.admin.manageUsers.new}</span>
                <Image src={newIcon} width={20} height={20} alt={dict.page.admin.manageUsers.new}></Image>
              </button>
            </div>
            {users && users.length > 0 ? (
              <Table 
                columns={userColumnsName}
                columnsTranslated={userColumns}
                data={users}
                actions={userActions} 
              />
            ) : (
              <p>{dict.commons.noContent}</p>
            )}
          </div>
          <h4>{dict.page.admin.manageApiKeys.title}</h4>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <h5>{dict.page.admin.manageApiKeys.list}</h5>
              <button onClick={e => createApiKey()}>
                <span>+ {dict.page.admin.manageApiKeys.new}</span>
                <Image src={newIcon} width={20} height={20} alt={dict.page.admin.manageApiKeys.new}></Image>
              </button>
            </div>
            {apiKeys && apiKeys.length > 0 ? (
              <Table
                columns={apiKeysColumnsName}
                columnsTranslated={apiKeysColumns}
                data={apiKeys}
                actions={apiKeysActions}
              />
            ) : (
              <p>{dict.commons.noContent}</p>
            )}
          </div>
        </div>
        <h3>
          · {dict.page.admin.endpointConfig.title + " "}
          <span>
            - {dict.page.admin.endpointConfig.description}
          </span>
        </h3>
        <div className={styles.refreshEndpoints}>
          <div id="loader" className={styles.hidden}>
            <Loader />
          </div>
          <button onClick={handleRefreshEndpoints}>{dict.page.admin.endpointConfig.refresh}</button>
        </div>
      </div>
      {showResult ? (
        <div
          id="result"
          className={`${styles.modal} ${
            isError ? styles.error : styles.success
          }`}
        >
          <p>{showResult}</p>
        </div>
      ) : (
        <></>
      )}
      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        content={modalContent}
        onClose={() => setModalOpen(false)}
        actions={modalActions}
      />
    </>
  );
}
