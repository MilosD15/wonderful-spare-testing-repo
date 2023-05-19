import { getCSSPropertyValueFromRoot } from "./additional-func.js";


if (document.querySelector("[data-theatre-section]")) {
  const theatreSection = document.querySelector("[data-theatre-section]");
  const videoLinksPlayBillContainer = theatreSection.querySelector("[data-playbill-video-links-container]");
  const videoLinksSidebarContainer = document.querySelector("[data-sidebar-video-links-container]");
  const videoModal = document.querySelector("[data-video-modal]");
  const videoModalVideo = videoModal.querySelector("[data-video-modal-video]");
  const upNextSidebarOpenBtn = theatreSection.querySelector("[data-up-next-sidebar-open-btn]");
  const upNextSidebar = document.querySelector("[data-up-next-sidebar]");
  const upNextSidebarCloseBtn = upNextSidebar.querySelector("[data-up-next-sidebar-close-btn]");
  const theatrePlaybillPanel = document.querySelector("[data-theatre-playbill-panel]");
  const officesLoveSection = document.querySelector("[data-offices-love-section]");
  const officesLoveVideosGrid = officesLoveSection.querySelector("[data-offices-love-videos-grid]");

  const sidebarAnimationDuration = parseInt(getCSSPropertyValueFromRoot("--CINEMA-PAGE-sidebar-animation-duration"));
  
  fetchVideoLinksInfo("../cinema-videos.json").then(videoLinksInfo => {
    videoLinksInfo.forEach(videoLinkInfo => {
      renderVideoLink(videoLinkInfo, videoLinksPlayBillContainer);
      renderVideoLink(videoLinkInfo, videoLinksSidebarContainer);
    });
  });

  fetchVideoLinksInfo("../offices-love-videos.json").then(videoLinksInfo => {
    videoLinksInfo.forEach(videoLinkInfo => {
      renderVideoLink(videoLinkInfo, videoLinksSidebarContainer);
      renderVideosGridItem(videoLinkInfo, officesLoveVideosGrid, officesLoveSection);
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest("[data-video-link]")) return;

    const videoLink = e.target.closest("[data-video-link]");

    if (e.target.closest("[data-sidebar-video-links-container]")) {
      videoModal.dataset.upNextSidebarState = "open";
    }

    const videoUrl = videoLink.dataset.videoLink;
    videoModal.dataset.state = "";
    openVideoModal(videoUrl);
  });

  document.addEventListener("click", e => {
    if (e.target.closest("[data-video-frame-container]") || e.target.closest("[data-up-next-sidebar]") 
    || e.target.closest("[data-up-next-sidebar-open-btn]")) return;

    
    if (videoModal.dataset.upNextSidebarState === "open") {
      handleClosingSidebar(upNextSidebar, videoModal, theatrePlaybillPanel, sidebarAnimationDuration);
    }
  });

  videoModal.addEventListener("click", e => {
    if (e.target.closest("[data-video-frame-wrapper]") || e.target.closest("[data-video-modal-video]")) return;

    videoModalVideo.pause();
    videoModal.dataset.state = "close";

    setTimeout(() => {
      videoModal.close();
    }, sidebarAnimationDuration);
  });

  upNextSidebarOpenBtn.addEventListener("click", () => {
    upNextSidebar.show();
    videoModal.dataset.upNextSidebarState = "open";
    theatrePlaybillPanel.classList.remove("active");
    theatrePlaybillPanel.classList.add("inactive");
  });
  upNextSidebarCloseBtn.addEventListener("click", () => {
    handleClosingSidebar(upNextSidebar, videoModal, theatrePlaybillPanel, sidebarAnimationDuration);
  });
}

function handleClosingSidebar(upNextSidebar, videoModal, theatrePlaybillPanel, sidebarAnimationDuration) {
  upNextSidebar.dataset.state = "close";
  videoModal.dataset.upNextSidebarState = "close";
  theatrePlaybillPanel.classList.remove("inactive");
  theatrePlaybillPanel.classList.add("active");

  setTimeout(() => {
    upNextSidebar.dataset.state = "";
    upNextSidebar.close();
  }, sidebarAnimationDuration);
}

function openVideoModal(videoUrl) {
  const aspectRatiosObjects = [
    { value: 16 / 12.4, correspondingFrameImageUrl: "./images/video-frame-160-124-ratio.webp", class: "video-modal--4-3-vid-ratio" },
    { value: 16 / 9.4, correspondingFrameImageUrl: "./images/video-frame-160-94-ratio.webp", class: "video-modal--16-9-vid-ratio" },
    { value: 10.5 / 16, correspondingFrameImageUrl: "./images/video-frame-105-160-ratio.webp", class: "video-modal--9-16-vid-ratio" },
  ];

  const videoModal = document.querySelector("[data-video-modal]");
  const videoModalVideo = videoModal.querySelector("[data-video-modal-video]");
  const videoPlaceholder = videoModal.querySelector("[data-video-placeholder]");
  const videoModalFrameImage = videoModal.querySelector("[data-video-modal-frame-image]");

  videoPlaceholder.src = videoUrl;
  videoPlaceholder.addEventListener("loadedmetadata", () => {
    const videoAspectRatioValue = videoPlaceholder.videoWidth / videoPlaceholder.videoHeight;
    const closestAspectRatioObj = determineClosestAspectRatioObj(aspectRatiosObjects, videoAspectRatioValue);

    videoModalFrameImage.src = closestAspectRatioObj.correspondingFrameImageUrl;
    videoModalVideo.src = videoUrl;
    videoModalVideo.play();
    removeAspectRatioClasses(videoModal);
    videoModal.classList.add(closestAspectRatioObj.class);
    videoModal.show();
  }, { once: true });
}

function renderVideosGridItem(videoLinkInfo, gridContainer, parentSection) {
  const gridItem = document.createElement("button");
  gridItem.classList.add("offices-love__videos-grid-item");
  gridItem.dataset.videoLink = videoLinkInfo.video_url;

  const aspectRatiosObjects = [
    { value: 16 / 16, class: "ar-1-1" },
    // { value: 16 / 9, class: "ar-16-9" },
    { value: 9 / 16, class: "ar-9-16" },
    // { value: 16 / 44, class: "ar-16-44" },
    // { value: 44 / 16, class: "ar-44-16" },
  ];

  const gridItemImage = document.createElement("img");
  gridItemImage.classList.add("offices-love__videos-grid-item-image");
  gridItemImage.alt = `${videoLinkInfo.video_title} thumbnail`;

  const auxillaryImage = document.createElement("img");
  auxillaryImage.classList.add("override-default-image-stylings", "visually-hidden");
  auxillaryImage.src = videoLinkInfo.video_thumbnail;
  gridItem.appendChild(auxillaryImage);

  auxillaryImage.addEventListener("load", () => {
    const imageAspectRatioValue = auxillaryImage.clientWidth / auxillaryImage.clientHeight;
    const closestAspectRatioObj = determineClosestAspectRatioObj(aspectRatiosObjects, imageAspectRatioValue);
    // console.log(closestAspectRatioObj);

    gridItem.classList.add(closestAspectRatioObj.class);
    gridItemImage.src = videoLinkInfo.video_thumbnail;
  }, { once: true });

  gridItem.appendChild(gridItemImage);
  gridContainer.appendChild(gridItem);
}

function removeAspectRatioClasses(videoModal) {
  videoModal.classList.remove("video-modal--4-3-vid-ratio");
  videoModal.classList.remove("video-modal--16-9-vid-ratio");
  videoModal.classList.remove("video-modal--9-16-vid-ratio");
}

function determineClosestAspectRatioObj(aspectRatios, elemAspectRatio) {
  let minDifference = Infinity;
  let closestAspectRatioObj = null;

  for (let i = 0; i < aspectRatios.length; i++) {
    const difference = Math.abs(aspectRatios[i].value - elemAspectRatio);
    if (difference < minDifference) {
      minDifference = difference;
      closestAspectRatioObj = aspectRatios[i];
    }
  }

  return closestAspectRatioObj;
}

async function fetchVideoLinksInfo(fileName) {
  const responseData = await fetch(fileName);
  const data = await responseData.json();
  return data;
}

function renderVideoLink(videoLinkInfo, videoLinksContainer) {
  const videoLinkElement = document.createElement("button");
  videoLinkElement.classList.add("video-link");
  videoLinkElement.dataset.videoLink = videoLinkInfo.video_url;

  if (videoLinkInfo.video_thumbnail !== "") {
    videoLinkElement.classList.add("video-link--with-thumbnail");

    const videoLinkThumbnailContainer = document.createElement("div");
    videoLinkThumbnailContainer.classList.add("video-link-thumbnail");

    const videoLinkThumbnail = document.createElement("img");
    videoLinkThumbnail.src = videoLinkInfo.video_thumbnail;
    videoLinkThumbnail.alt = `${videoLinkInfo.video_title} thumbnail`;
    videoLinkThumbnail.classList.add("video-link-thumbnail-image");

    videoLinkThumbnailContainer.appendChild(videoLinkThumbnail);
    videoLinkElement.appendChild(videoLinkThumbnailContainer);
  }

  const videoLinkTitle = document.createElement("h3");
  videoLinkTitle.classList.add("video-link-title");
  videoLinkTitle.textContent = videoLinkInfo.video_title;
  videoLinkElement.appendChild(videoLinkTitle);

  const videoLinkDescription = document.createElement("p");
  videoLinkDescription.classList.add("video-link-description");
  videoLinkDescription.textContent = videoLinkInfo.video_description;
  videoLinkElement.appendChild(videoLinkDescription);

  videoLinksContainer.appendChild(videoLinkElement);
}