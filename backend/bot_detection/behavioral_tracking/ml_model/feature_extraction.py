
import numpy as np

def extract_features(raw_data):
    """
    Extracts a wide variety of features from raw behavioral data received from the frontend.
    This is based on mouse movements, scroll positions, key presses, clicks, and session metadata.
    """
    mouse_movements = raw_data.get('mouseMovements', [])
    scroll_positions = raw_data.get('scrollPositions', [])
    key_press_times = raw_data.get('keyPressTimes', [])
    clicks = raw_data.get('clicks', [])
    session_duration = raw_data.get('sessionDuration', 0)

    # Initialize feature list
    features = []

    # Feature 1: Mouse Movement Speed
    if len(mouse_movements) > 1:
        mouse_speeds = [
            np.linalg.norm([mouse_movements[i]['x'] - mouse_movements[i - 1]['x'],
                            mouse_movements[i]['y'] - mouse_movements[i - 1]['y']])
            for i in range(1, len(mouse_movements))
        ]
        avg_mouse_speed = np.mean(mouse_speeds)
        std_mouse_speed = np.std(mouse_speeds)
        features.extend([avg_mouse_speed, std_mouse_speed])
    else:
        features.extend([0, 0])

    # Feature 2: Scroll Speed
    if len(scroll_positions) > 1:
        scroll_speeds = [
            abs(scroll_positions[i] - scroll_positions[i - 1])
            for i in range(1, len(scroll_positions))
        ]
        avg_scroll_speed = np.mean(scroll_speeds)
        std_scroll_speed = np.std(scroll_speeds)
        features.extend([avg_scroll_speed, std_scroll_speed])
    else:
        features.extend([0, 0])

    # Feature 3: Key Press Interval
    if len(key_press_times) > 1:
        key_press_intervals = [
            key_press_times[i] - key_press_times[i - 1]
            for i in range(1, len(key_press_times))
        ]
        avg_key_press_interval = np.mean(key_press_intervals)
        std_key_press_interval = np.std(key_press_intervals)
        features.extend([avg_key_press_interval, std_key_press_interval])
    else:
        features.extend([0, 0])

    # Feature 4: Click Intervals
    if len(clicks) > 1:
        click_intervals = [
            clicks[i]['time'] - clicks[i - 1]['time']
            for i in range(1, len(clicks))
        ]
        avg_click_interval = np.mean(click_intervals)
        std_click_interval = np.std(click_intervals)
        features.extend([avg_click_interval, std_click_interval])
    else:
        features.extend([0, 0])

    # Feature 5: Session Duration (in seconds)
    features.append(session_duration / 1000)  # Convert milliseconds to seconds

    # Feature 6: Number of Clicks
    features.append(len(clicks))

    # Feature 7: Number of Key Presses
    features.append(len(key_press_times))

    # Feature 8: Mouse Movement Range (Bounding box of mouse movements)
    if mouse_movements:
        x_coords = [pos['x'] for pos in mouse_movements]
        y_coords = [pos['y'] for pos in mouse_movements]
        mouse_range_x = max(x_coords) - min(x_coords)
        mouse_range_y = max(y_coords) - min(y_coords)
        features.extend([mouse_range_x, mouse_range_y])
    else:
        features.extend([0, 0])

    # Add additional features as needed for more complex behavior analysis.

    return np.array(features).reshape(1, -1)
