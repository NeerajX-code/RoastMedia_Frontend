import React from "react";
import "./NotificationPage.css";

const NotificationPage = () => {
  const todayNotifications = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdH9wFbeMEyx-imSZO3fAglqdBjHDJhjAZTlAl1aErYHS0YEIroF-o3zipahh7OpX3v18cmx6Ko5wowJ3DnIvNPulpQLty7BPR59ucR6vgSB5rYG8rQbapboALRSNHAOt8F5rNJsA4Wj36Xq_P4lm7IsBUHN0H_OH51pHl-Ew1ydiJFTvdyz96IlL1ZeM6zH2gfa_hrrMI-Bxar7hOrR1MHG8MyaxW9CSFIc-es_Jw1WrEw_1aK4wrxuAQwkeYOcDJ737NURnvokQ",
      text: "Sophia liked your post",
      time: "1h",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIhZ9uq0sYEq4yhsURcrWdToIhE8KiYY2NIfJRI1LcOvYRHGd6JA17Kqzr_3zPDuAQbwDIGEpdrlsDOjgr4AUavIpgS6dyPgV68EMZyBSq7tU5-SsC4Ke13ZHcvQaWA9hOgG0lm-6HZr43doliGpN1iCwdSJHrdT2MIOh-WpwDrtyAzp1ScHtYMl_7cfw982rOK39_aNjovsIs4-hLjTx3XCOpIPHZk6uvIZTjX3wZfTTdSV8P28f-1Uii7hnI_QoA042qNP3dGD8",
      text: "Ethan commented on your post",
      time: "2h",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM6IS7eteLkdhxgtAnVzhjmI4o-0sIlcz6_nlq0Gp-ApgvBasBoyFLv3kEx67w0_ayhbj7AqLjzTLgAmn88k-IkBv-vZvVupzvkA6qV7-fdTwyw83XfuhRiUGZhEUgAWtKDibkqOPT_BF7gDeTysYM81odVF90Pg_cz9NDxkQfeyzmrpG2uJWVrBJmWvMc85IJ4WNrsMmoZV7SbA2YcU5ikE0nf7WLW-vJweXKyPB60o7Fu0YUG1UOg_RMsEq1gEj7rZxo1Ej9KuY",
      text: "Olivia started following you",
      time: "3h",
    },
  ];

  const yesterdayNotifications = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHlKMEj7Q6xkXiVI3eTLYanaTLoVYGCxgDy1bz9LkERfG4NoLHM6l5MHoWJzwJba0PIKvPYzJIAzeLo_42Fw2ZtK5cC2Ctn02y2fIyYwqRJnxOrqyWjTQ75aMKC1xaImopzS7nWAYV2vhlIzjVJQjnc8B3TzS-1kcB5dsY5k6lTzfhocAyx46ebqn-7BssQ31oYLafLz-mWErbd8jFqyQ3w1cKrcd5C7bWFOmEZd8gHpaJa_0pxEqtjSnn2UhLoscYwNYwpz1Ff08",
      text: "Liam liked your post",
      time: "1d",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOpVTkThbsV3qOTOAQN5Xv43VFR1Ti6krTTIeyO3jz9amdjpLRD3Bj6vG5u0CFg4fuUjSZhH5vASKHnte72rcJC5ySF2aVIEWmfnXVVycAPXYZi4qkvJQLCXDzHm1ehw_94JeHpC39A_uUSqsgIC1JnAcM3g4vuOP6CcyLeTu_Q3II-rXK6r9Sx1Laieph1ClmMO3rvD8ool5DnaEy5maw0df5Yz_7DDUIbDIYqn0N_54jdWpdV1fUSGhwfDmv1uvW2-5DFkozmGE",
      text: "Ava commented on your post",
      time: "1d",
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAx98e8ofIB9brakRzaiD3X2Bhx-34wtN0tY72GsAPJT6tC8uQ15HVd4dSJyMlnQ8C3YmabJcoAJRlpxrLG4eaH5bMS-0Uw7QduqgxZgclF1S5RzbsRRW4ERmvdau8mkvCuWmRWJrJRow9R6gWk3QdgtBqdNCJ7J8sKa4JusiMAMsjeyw1rbjjZfAR62DG726c6SJ0zydkeihPLzDz7CT-aEkjAig9JHD4s6-vBU3Wpba54kjXfGoH2gk7wmVJ7byCLdtdog7TOMs",
      text: "Noah started following you",
      time: "1d",
    },
  ];

  const renderList = (items) =>
    items.map((item, i) => (
      <div className="notification-item" key={i}>
        <div
          className="avatar"
          style={{ backgroundImage: `url(${item.img})` }}
        ></div>
        <div className="content">
          <p className="text">{item.text}</p>
          <p className="time">{item.time}</p>
        </div>
      </div>
    ));

  return (
    <div className="notification-page">
      {/* Header */}
      <div className="header">
        <h2>Notifications</h2>
        <button className="settings-btn">
          <i className="icon-gear">⚙️</i>
        </button>
      </div>

      {/* Today */}
      <h3 className="section-title">Today</h3>
      {renderList(todayNotifications)}

      {/* Yesterday */}
      <h3 className="section-title">Yesterday</h3>
      {renderList(yesterdayNotifications)}
    </div>
  );
};

export default NotificationPage;
