import theme_one_default_style from '../images//theme-one-default-style.png';
import theme_two_stripped_table from '../images/theme-two-stripped-table.png';
import theme_three_dark_table from '../images/theme-three-dark-table.png';
import theme_four_tailwind_style from '../images/theme-four-tailwind-style.png';
import theme_five_colored_column from '../images/theme-five-colored-column.png';
import theme_six_hovered_style from '../images/theme-six-hovered-style.png';
import theme_minimal_six_hovered_style from '../images/theme_minimal_six_hovered_style.png';
import theme_dark_knight_style from '../images/theme_dark_knight_style.png';
import theme_uppercase_elegant_style from '../images/theme_uppercase_elegant_style.png';

import Modal from './../core/Modal';
import React, { useState, useEffect, useRef } from 'react';
import { getStrings, isProActive } from './../Helpers';
import { swapIcon, lockWhite, hintIcon, Cross } from '../icons';
import Tooltip from './Tooltip';
import '../styles/_tableTheme.scss';


const ThemeSettings = ({ tableSettings, setTableSettings }) => {
	//Old name: DisplaySettings 

	const [importModal, setImportModal] = useState<boolean>(false);
	const confirmImportRef = useRef();

	const handleImportStyle = (e) => {

		setTableSettings({
			...tableSettings,
			table_settings: {
				...tableSettings.table_settings,
				import_styles: e.target.checked,
			},
		});

		if (e.target.checked === false) {
			setImportModal(true);
		}
	};

	const handleClosePopup = () => {
		setImportModal(false);
	};

	const handleDisableImportStyle = () => {
		handleClosePopup();
		setTableSettings({
			...tableSettings,
			table_settings: {
				...tableSettings.table_settings,
				import_styles: false,
			},
		});
	};

	const handleCloseImportStylemodal = () => {
		handleClosePopup();
		setTableSettings({
			...tableSettings,
			table_settings: {
				...tableSettings.table_settings,
				import_styles: true,
			},
		});
	};


	/**
	 * Alert if clicked on outside of element
	 *
	 * @param  event
	 */
	function handleCancelOutside(event: MouseEvent) {
		if (
			confirmImportRef.current &&
			!confirmImportRef.current.contains(event.target)
		) {
			handleClosePopup();
		}
	}

	useEffect(() => {
		const handleClick = () => {
			WPPOOL.Popup('sheets_to_wp_table_live_sync').show();
		};
		document.addEventListener('mousedown', handleCancelOutside);

		const proSettings = document.querySelectorAll('.swptls-pro-settings, .btn-pro-lock');
		proSettings.forEach(item => {
			item.addEventListener('click', handleClick);
		});


		return () => {
			document.removeEventListener('mousedown', handleCancelOutside);
			proSettings.forEach(item => {
				item.removeEventListener('click', handleClick);
			});
		};
	}, [handleCancelOutside]);

	return (
		<div>
			{importModal && (
				<Modal>
					<div className="import-style-modal-wrap modal-content" ref={confirmImportRef}>
						<div className="cross_sign" onClick={handleCloseImportStylemodal}>
							{Cross}
						</div>
						<div className="import-style-modal">
							<h2>{getStrings('are-you-sure-to-disable')}</h2>
							<p>{getStrings('imported-style-desc')}</p>
							<div className="action-buttons">
								<button className="swptls-button cancel-button" onClick={handleCloseImportStylemodal}>
									{getStrings('Cancel')}
								</button>
								<button className="swptls-button confirm-button" onClick={handleDisableImportStyle}>
									{getStrings('yes-disable')}
								</button>
							</div>
						</div>
					</div>
				</Modal>
			)}

			<div className="edit-table-customization-wrap">
				<div className="edit-form-group">

					<div className="table-customization-theme-wrapper">
						<div className={`edit-form-group table-style`}>
							<label
								className={`${!isProActive() ? `swptls-pro-settings` : ``}`}
								htmlFor="table-style"
							>
								<div className="toggle-switch">
									<input
										type="hidden"
										name="import_styles"
										value={tableSettings?.table_settings?.import_styles}
									/>
									<input
										type="checkbox"
										id="table-style"
										checked={tableSettings?.table_settings?.import_styles}
										onChange={handleImportStyle}
										disabled={!isProActive()}
									/>
									<div className="slider round"></div>
								</div>
								{getStrings('import-color-from-sheet')}{' '}
								<Tooltip content={getStrings('tooltip-40')} />{' '}
							</label>
							<span className='import-tooltip'>
								{!isProActive() && (<button className='btn-pro'>{getStrings('pro')}</button>)}
							</span>
						</div>


						{/* Theme  */}
						<h4>
							{getStrings('select-theme')}{' '}
							<Tooltip content={`Quickly change your table's look and feel using themes`} />
						</h4>

						{tableSettings?.table_settings?.import_styles && (
							<>
								<div className="invalid-card has--import-enabled">
									<label className="import-enabled">
										<span className="icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
												<path d="M7 0.5C5.61553 0.5 4.26216 0.910543 3.11101 1.67971C1.95987 2.44888 1.06266 3.54213 0.532846 4.82122C0.00303299 6.1003 -0.13559 7.50776 0.134506 8.86563C0.404603 10.2235 1.07129 11.4708 2.05026 12.4497C3.02922 13.4287 4.2765 14.0954 5.63437 14.3655C6.99224 14.6356 8.3997 14.497 9.67879 13.9672C10.9579 13.4373 12.0511 12.5401 12.8203 11.389C13.5895 10.2378 14 8.88447 14 7.5C13.998 5.64409 13.2599 3.86475 11.9476 2.55242C10.6353 1.24009 8.85592 0.50196 7 0.5ZM6.73077 3.73077C6.89052 3.73077 7.04668 3.77814 7.1795 3.86689C7.31233 3.95564 7.41585 4.08178 7.47698 4.22937C7.53811 4.37696 7.55411 4.53936 7.52294 4.69603C7.49178 4.85271 7.41485 4.99663 7.3019 5.10959C7.18894 5.22254 7.04502 5.29947 6.88834 5.33063C6.73167 5.3618 6.56927 5.3458 6.42168 5.28467C6.27409 5.22354 6.14795 5.12001 6.0592 4.98719C5.97045 4.85437 5.92308 4.69821 5.92308 4.53846C5.92308 4.32425 6.00817 4.11881 6.15965 3.96734C6.31112 3.81586 6.51656 3.73077 6.73077 3.73077ZM7.53846 11.2692C7.25285 11.2692 6.97893 11.1558 6.77696 10.9538C6.575 10.7518 6.46154 10.4779 6.46154 10.1923V7.5C6.31873 7.5 6.18177 7.44327 6.08079 7.34229C5.97981 7.24131 5.92308 7.10435 5.92308 6.96154C5.92308 6.81873 5.97981 6.68177 6.08079 6.58079C6.18177 6.47981 6.31873 6.42308 6.46154 6.42308C6.74716 6.42308 7.02108 6.53654 7.22304 6.7385C7.425 6.94046 7.53846 7.21438 7.53846 7.5V10.1923C7.68127 10.1923 7.81823 10.249 7.91921 10.35C8.0202 10.451 8.07692 10.588 8.07692 10.7308C8.07692 10.8736 8.0202 11.0105 7.91921 11.1115C7.81823 11.2125 7.68127 11.2692 7.53846 11.2692Z" fill="#FF8023" />
											</svg>
										</span>

										<span>{getStrings('theme-alert')}</span>

									</label>
								</div>
							</>
						)}


						{/* Default Style - default-style = new name: Simple  */}
						<div className={`table-customization-theme-btns ${tableSettings
							?.table_settings
							?.import_styles ? 'active_sheetstyle' : 'disable_sheetstyle'
							}`}
						>
							<div className="item-wrapper">
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'default-style'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'default-style',
											},
										})
									}
								>
									<img
										src={
											theme_one_default_style
										}
										alt="theme_one_default_style"
									/>
								</button>
								<span>{getStrings('Simple')}</span>
							</div>

							{/* Dark Table - style-4 : new name: Simple on dark*/}
							<div className="item-wrapper">
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-4'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-4',
											},
										})
									}
								>
									<img
										src={
											theme_three_dark_table
										}
										alt="theme_three_dark_table"
									/>

								</button>
								<span>{getStrings('Dark-Table')}</span>
							</div>

							{/* PRO Theme  */}

							{/* Vertical style place on last  */}


							{/* Minimal new styke - style-6 : new name: Minimal */}
							<div className={`item-wrapper${!isProActive() ? ` swptls-pro-theme` : ``}`}>
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-6'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-6',
											},
										})
									}
									disabled={!isProActive()}
								>
									<img
										src={
											theme_minimal_six_hovered_style
										}
										alt="theme_minimal_six_hovered_style"
									/>
									{!isProActive() && (<div className='btn-pro-lock'>{lockWhite} <span className="pro-tag-unlock">{getStrings('unlock')}</span></div>)}

									<div className={`theme-new-tag ${!isProActive() ? `theme-new-tag-lock` : ``}`}><span className="pro-tag-unlock theme-new-tags">{getStrings('new')}</span></div>

								</button>
								<span>{getStrings('minimal-simple-style')}</span>
							</div>


							{/* Stripped Table style-2 : new name: Minimal on dark */}
							<div className={`item-wrapper${!isProActive() ? ` swptls-pro-theme` : ``}`}>
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-2'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-2',
											},
										})
									}
									disabled={!isProActive()}
								>
									<img
										src={
											theme_two_stripped_table
										}
										alt="theme_two_stripped_table"
									/>
									{!isProActive() && (<div className='btn-pro-lock'>{lockWhite} <span className="pro-tag-unlock">{getStrings('unlock')}</span></div>)}
								</button>
								<span>{getStrings('minimal-Table')}</span>
							</div>



							{/* Hover Style - style-3: new name: minimal-elegant-style */}
							<div className={`item-wrapper${!isProActive() ? ` swptls-pro-theme` : ``}`}>
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-3'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-3',
											},
										})
									}
									disabled={!isProActive()}
								>
									<img
										src={
											theme_six_hovered_style
										}
										alt="theme_six_hovered_style"
									/>
									{!isProActive() && (<div className='btn-pro-lock'>{lockWhite} <span className="pro-tag-unlock">{getStrings('unlock')}</span></div>)}
								</button>
								<span>{getStrings('minimal-elegant-style')}</span>
							</div>

							{/* Taliwind Style - style-5 : new name: Uppercase-heading*/}
							<div className={`item-wrapper${!isProActive() ? ` swptls-pro-theme` : ``}`}>
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-5'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-5',
											},
										})
									}
									disabled={!isProActive()}
								>
									<img
										src={
											theme_four_tailwind_style
										}
										alt="theme_four_tailwind_style"
									/>
									{!isProActive() && (<div className='btn-pro-lock'>{lockWhite} <span className="pro-tag-unlock">{getStrings('unlock')}</span></div>)}
								</button>
								<span>{getStrings('Uppercase-heading')}</span>
							</div>


							{/* Uppercase elegant style new style - style-8 : new name: Uppercase elegant */}
							<div className={`item-wrapper${!isProActive() ? ` swptls-pro-theme` : ``}`}>
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-8'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-8',
											},
										})
									}
									disabled={!isProActive()}
								>
									<img
										src={
											theme_uppercase_elegant_style
										}
										alt="theme_uppercase_elegant_style"
									/>
									{!isProActive() && (<div className='btn-pro-lock'>{lockWhite} <span className="pro-tag-unlock">{getStrings('unlock')}</span></div>)}

									<div className={`theme-new-tag ${!isProActive() ? `theme-new-tag-lock` : ``}`}><span className="pro-tag-unlock theme-new-tags">{getStrings('new')}</span></div>

								</button>
								<span>{getStrings('uppercase-elegant-theme')}</span>
							</div>



							{/* Colored Column - style-1 : new name: vertical-style */}
							<div className={`item-wrapper${!isProActive() ? ` swptls-pro-theme` : ``}`}>
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-1'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-1',
											},
										})
									}
									disabled={!isProActive()}
								>
									<img
										src={
											theme_five_colored_column
										}
										alt="theme_five_colored_column"
									/>
									{!isProActive() && (<div className='btn-pro-lock'>{lockWhite} <span className="pro-tag-unlock">{getStrings('unlock')}</span></div>)}
								</button>
								<span>{getStrings('vertical-style')}</span>
							</div>


							{/* Dark Style new style - style-7 : new name: Dark */}
							<div className={`item-wrapper${!isProActive() ? ` swptls-pro-theme` : ``}`}>
								<button
									className={`single-theme-button${tableSettings
										?.table_settings
										?.table_style ===
										'style-7'
										? ' active'
										: ''
										}`}
									onClick={() =>
										setTableSettings({
											...tableSettings,
											table_settings: {
												...tableSettings.table_settings,
												table_style:
													'style-7',
											},
										})
									}
									disabled={!isProActive()}
								>
									<img
										src={
											theme_dark_knight_style
										}
										alt="theme_dark_knight_style"
									/>
									{!isProActive() && (<div className='btn-pro-lock'>{lockWhite} <span className="pro-tag-unlock">{getStrings('unlock')}</span></div>)}

									<div className={`theme-new-tag ${!isProActive() ? `theme-new-tag-lock` : ``}`}><span className="pro-tag-unlock theme-new-tags">{getStrings('new')}</span></div>

								</button>
								<span>{getStrings('dark-style-theme')}</span>
							</div>






						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default ThemeSettings;
