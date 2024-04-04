const heightOfTabContentForThreeRows = 130;
let filterCriteriaTabs;

window.addEventListener('load', function() {
  const filterCriteriaLabels = document.querySelectorAll('.filters__tab-label-item');
  filterCriteriaTabs = getInitialFilterCriteriaTabObjects();
  // look for the active one and update its object
  updateFilterCriteriaTabs();

  filterCriteriaLabels.forEach(label => {
    label.addEventListener('click', function() {
      // update the filterCriteriaTabs array when other tabs are opened
      updateFilterCriteriaTabs();
    });
  });
});

function getInitialFilterCriteriaTabObjects() {
  const filterTabs = [...document.querySelectorAll('.filters__tab')];
  let filterCriteriaTabs = [];

  filterTabs.forEach(tab => {
    filterCriteriaTabs.push({
      expandable: false,
    });
  });

  return filterCriteriaTabs;
}

function updateFilterCriteriaTabs() {
  const filterTabs = [...document.querySelectorAll('.filters__tab')];
  filterTabs.forEach((tab, index) => {
    if (tab.classList.contains('filters__tab--active')) {
      const tabContent = tab.querySelector('.filters__tab-content');
      if (tabContent.clientHeight > heightOfTabContentForThreeRows) {
        if (!filterCriteriaTabs[index].expandable) {
          filterCriteriaTabs[index].expandable = true;
          filterCriteriaTabs[index].expanded = false;
          filterCriteriaTabs[index].initialHeight = tabContent.clientHeight;
          tab.classList.add('filters__tab--expandable');
          addExpandCollapseFunctionality(tab, index);
        }
      }
    }
  });
  // console.log(filterCriteriaTabs);
}

function addExpandCollapseFunctionality(tab, tabIndex) {
  const expandCollapseButtonContainer = document.createElement('div');
  expandCollapseButtonContainer.classList.add('filters__tab-expand-collapse-button-container');
  const expandCollapseButton = document.createElement('button');
  expandCollapseButton.classList.add('filters__tab-expand-collapse-button');
  expandCollapseButton.textContent = 'More tags';
  expandCollapseButtonContainer.appendChild(expandCollapseButton);
  expandCollapseButton.addEventListener('click', function() {
    const tabContentHeight = filterCriteriaTabs[tabIndex].initialHeight;

    if (filterCriteriaTabs[tabIndex].expanded) {
      tab.style.height = `${heightOfTabContentForThreeRows}px`;
      expandCollapseButton.textContent = 'More tags';
    } else {
      tab.style.height = `${tabContentHeight}px`;
      expandCollapseButton.textContent = 'Less tags';
    }

    filterCriteriaTabs[tabIndex].expanded = !filterCriteriaTabs[tabIndex].expanded;
    // console.log(filterCriteriaTabs);
  });
  tab.appendChild(expandCollapseButtonContainer);
}