import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ResourceCard.module.css';

const ResourceCard = ({ resource }) => {
	const [showModal, setShowModal] = useState(false);

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const openInNewWindow = () => {
		if (resource.type === 'video') {
			let url = resource.url.replace('embed/', 'watch?v=');
			window.open(url, '_blank');
		} else {
			window.open(resource.url, '_blank');
		}
	};

	const isYouTubeVideo =
		resource.type.toLowerCase() === 'video' &&
		(resource.url.includes('youtube.com') || resource.url.includes('youtu.be'));

	return (
		<div className={styles.card}>
			<h3>{resource.title}</h3>
			<p>
				<strong>Population:</strong> {resource.population}
			</p>
			<p>
				<strong>Time:</strong> {resource.time} mins
			</p>
			<div className={styles.buttonGroup}>
				{isYouTubeVideo && <button onClick={openModal}>View Embedded</button>}
				<button onClick={openInNewWindow}>Open in New Window</button>
			</div>
			{isYouTubeVideo && showModal && (
				<Modal onClose={closeModal}>
					<div className={styles.modalContent}>
						<h3>{resource.title}</h3>
						<iframe
							title={resource.title}
							src={resource.url}
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
							className={styles.iframe}></iframe>
						<button onClick={closeModal}>Close</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default ResourceCard;
