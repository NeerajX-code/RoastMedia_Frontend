import React from "react";
import "./SearchUserPage.css";

const SearchUserPage = () => {
  const users = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDp66GBum35TQVB2lBTO21G31_l1cDCarrOz8YdoCl4kPTvxKuZlc4S6id4Txb2o0WiJb0ZPBB8lnazR1iSuE0PwtyiCKnhay1PXWBUen-xHTe1etYRBFzUnypiqQa-LnVDJvNTOzrh1aMNtE2GcSx-ojh4iRWBUTTFT40uEndoK5WlPYJFVAnBVA8mUCnkb0Z4Dn_kTeQapYYaBnDXWFWLDKo8f_6se2SuDo2EQJNEPgptTXojzOMBs5J3bVfUkFaPJ7HfoHlE-EA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDNkxLHnAKbU1UdEhflo5wJoezAhAV6gH8q7yIXJNGp6gkuMay0Oh5769Pr2oKgBeJBSnqD-qPgyQWBiP7HTIp5K3B85QgMuRH1JIgy1qK9vT5iL_26uI56fIhL4jrgFDWi_ZI6907gY5Wldh1bmm-yI0qCaG2TVtDSNjT44Jk7ZosjbV__wtftnl-jk8CUXeHeP9ciMvD65uuFhDmIX9p9SzbUfJZ0UXmyvZRg0NDNStYw2uomz0gq3MubrZYHsuTWnb1IXCK4oTM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAtfn0JECkftA8up3j2VRxV1knSNRhkkv7pNCYue35JzharBPGFHHNX8Uwv7yTCMCzOao_eJlAz_Z3_VkpxEeeuOhNNPDOX4BuLLXdEmlvElIAM2I81zgl_1y0uUIgip4t8Hqjn57L0IzAHpq28ETReCumAaSzO0sm8YgtoOHRaVbkQZHQCdXO8uq9xPg3IPimD_OhDtiWPYWpbrHXkC__0-D1nvnrRgcyqhFYpTo2vYrKl6DI5t603rBR_m6NoGOEg2T1wqPH7b6Q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmD1iGlxO9nFJZetmAK2toqv5Tnww0h4gJCSTAwMqViIyEFJpVkYIMX69fERyClmVbRnkAVaGnMnT1o9FVmMuwSMTQc-p7F1-6gbo_vySoJsGse5hm2FPNw86XOr2Xnv_LpMws2sUeakDhyJz6iywk-KH6EHF5_PZnjrucTVncTcB9A0xpKf-IjCD9bl8C30Fw0pzksXI7vw2KPEwmlfAbRiSZuTer5nQ_Ga9oc2TZ-s-vO-NGPUqPckMCfVCHotMEldihCN6c-BM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC21LpKmHJ38E7F6uCWxTrtXUe0q_egLmO_bTEWE6eY9NTSNIuGNblEPw_PfsA70JfqlP4a0fr5MZfLuY-znNiUYX4miKnMIFMZtxBpK04opd1Cjb7qy0Fn5tpEiE_WIBAAid9Gz67rNuEyu4an0jsxasjysEdAHlq0-3UflPwh9Z9eQiT_e10T2D7qR4nIJC5r68r6PYEoPSKocUvRggpAyRjvzN33Tqyx-C5qXbCTtB4KWxW936kgKGuHjd4hbsIRETDdg0zvb0o",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDT3CU1WXHr-JBi4g5RcNr_cmiiwd3C1Kpi-AwrGW6obIZ_GROtVtN9U1CFMit9eTcN2c7Pn7n0rPh6G2Efl76SQ7rBgAfloVhxbmlPqv8pMpX63rAlbcbogacBdJAdugXYPKUVvqMCKDCXwj0Rk_nOl1ssOoSXhbTFqwGB8U75Ki5Puzyy_AuaNo-eoDZRYeSeW5pHMoSw3XkDwIf89v4V2MRYV1FzVj7wz5Yotwaun5IyCRCeVQAVZGuMg7yfFGriN16dvqX2cpg",
  ];

  return (
    <div className="search-user-page">
      {/* Search bar */}
      <div className="search-bar">
        <div className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <input type="text" placeholder="Search" />
        <button className="clear-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <a href="#" className="active">Top</a>
        <a href="#">Users</a>
      </div>

      {/* User grid */}
      <div className="user-grid">
        {users.map((url, i) => (
          <div key={i} className="user-card" style={{ backgroundImage: `url(${url})` }}></div>
        ))}
      </div>
    </div>
  );
};

export default SearchUserPage;
