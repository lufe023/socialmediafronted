import React, { useState, useRef, useEffect } from 'react';
import '../../public/plugins/bootstrap/js/bootstrap.bundle.min.js';
import '../../public/dist/js/adminlte.min.js';

import 'admin-lte/dist/js/adminlte.min.js';

const Customize = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [dropdownLegacyOffset, setDropdownLegacyOffset] = useState(false);
  const [noBorder, setNoBorder] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const [sidebarMini, setSidebarMini] = useState(true);
  const [sidebarMiniMD, setSidebarMiniMD] = useState(false);
  const [sidebarMiniXS, setSidebarMiniXS] = useState(false);
  const [navFlatStyle, setNavFlatStyle] = useState(false);
  const [navLegacyStyle, setNavLegacyStyle] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const [navChildIndent, setNavChildIndent] = useState(false);
  const [navChildHideOnCollapse, setNavChildHideOnCollapse] = useState(false);
  const [disableHoverFocusAutoExpand, setDisableHoverFocusAutoExpand] = useState(false);
  const [footerFixed, setFooterFixed] = useState(false);
  const [smallTextBody, setSmallTextBody] = useState(false);
  const [smallTextNavbar, setSmallTextNavbar] = useState(false);
  const [smallTextBrand, setSmallTextBrand] = useState(false);
  const [smallTextSidebarNav, setSmallTextSidebarNav] = useState(false);
  const [smallTextFooter, setSmallTextFooter] = useState(false);

  const handleCheckboxChange = (setter) => (event) => {
    setter(event.target.checked);
  };

  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      // Inicializar cualquier plugin de jQuery que AdminLTE requiera aquí
      // $(elementRef.current).find('.my-colorpicker1').colorpicker();
    }
  }, []);

  return (
    <aside ref={elementRef} className="control-sidebar control-sidebar-dark" style={{ display: 'block' }}>
      <div className="p-3 control-sidebar-content">
        <h5>Customize AdminLTE</h5>
        <hr className="mb-2" />
        <div className="mb-4">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleCheckboxChange(setDarkMode)}
            className="mr-1"
          />
          <span>Dark Mode</span>
        </div>
        <h6>Header Options</h6>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={headerFixed}
            onChange={handleCheckboxChange(setHeaderFixed)}
            className="mr-1"
          />
          <span>Fixed</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={dropdownLegacyOffset}
            onChange={handleCheckboxChange(setDropdownLegacyOffset)}
            className="mr-1"
          />
          <span>Dropdown Legacy Offset</span>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={noBorder}
            onChange={handleCheckboxChange(setNoBorder)}
            className="mr-1"
          />
          <span>No border</span>
        </div>
        <h6>Sidebar Options</h6>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={sidebarCollapsed}
            onChange={handleCheckboxChange(setSidebarCollapsed)}
            className="mr-1"
          />
          <span>Collapsed</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={sidebarFixed}
            onChange={handleCheckboxChange(setSidebarFixed)}
            className="mr-1"
          />
          <span>Fixed</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={sidebarMini}
            onChange={handleCheckboxChange(setSidebarMini)}
            className="mr-1"
          />
          <span>Sidebar Mini</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={sidebarMiniMD}
            onChange={handleCheckboxChange(setSidebarMiniMD)}
            className="mr-1"
          />
          <span>Sidebar Mini MD</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={sidebarMiniXS}
            onChange={handleCheckboxChange(setSidebarMiniXS)}
            className="mr-1"
          />
          <span>Sidebar Mini XS</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={navFlatStyle}
            onChange={handleCheckboxChange(setNavFlatStyle)}
            className="mr-1"
          />
          <span>Nav Flat Style</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={navLegacyStyle}
            onChange={handleCheckboxChange(setNavLegacyStyle)}
            className="mr-1"
          />
          <span>Nav Legacy Style</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={navCompact}
            onChange={handleCheckboxChange(setNavCompact)}
            className="mr-1"
          />
          <span>Nav Compact</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={navChildIndent}
            onChange={handleCheckboxChange(setNavChildIndent)}
            className="mr-1"
          />
          <span>Nav Child Indent</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={navChildHideOnCollapse}
            onChange={handleCheckboxChange(setNavChildHideOnCollapse)}
            className="mr-1"
          />
          <span>Nav Child Hide on Collapse</span>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={disableHoverFocusAutoExpand}
            onChange={handleCheckboxChange(setDisableHoverFocusAutoExpand)}
            className="mr-1"
          />
          <span>Disable Hover/Focus Auto-Expand</span>
        </div>
        <h6>Footer Options</h6>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={footerFixed}
            onChange={handleCheckboxChange(setFooterFixed)}
            className="mr-1"
          />
          <span>Fixed</span>
        </div>
        <h6>Small Text Options</h6>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={smallTextBody}
            onChange={handleCheckboxChange(setSmallTextBody)}
            className="mr-1"
          />
          <span>Body</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={smallTextNavbar}
            onChange={handleCheckboxChange(setSmallTextNavbar)}
            className="mr-1"
          />
          <span>Navbar</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={smallTextBrand}
            onChange={handleCheckboxChange(setSmallTextBrand)}
            className="mr-1"
          />
          <span>Brand</span>
        </div>
        <div className="mb-1">
          <input
            type="checkbox"
            checked={smallTextSidebarNav}
            onChange={handleCheckboxChange(setSmallTextSidebarNav)}
            className="mr-1"
          />
          <span>Sidebar Nav</span>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={smallTextFooter}
            onChange={handleCheckboxChange(setSmallTextFooter)}
            className="mr-1"
          />
          <span>Footer</span>
        </div>
        <h6>Navbar Variants</h6>
        <div className="d-flex">
          <select className="custom-select mb-3 text-light border-0 bg-light">
            <option value="bg-light">Light</option>
            <option value="bg-dark">Dark</option>
            <option value="bg-primary">Primary</option>
            <option value="bg-success">Success</option>
            <option value="bg-info">Info</option>
            <option value="bg-warning">Warning</option>
            <option value="bg-danger">Danger</option>
          </select>
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary"
            data-card-widget="fullscreen"
          >
            <i className="fas fa-expand" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Customize;
