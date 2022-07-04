import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

    done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    async notifyMe() {
        let permissionGranted = await isPermissionGranted(); // 检查是否授予发送通知的权限
        if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted'; // 若检查时未授予，授予发通知的权限
        }
        if (permissionGranted) {
            sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' }); // 发送toast通知
        }
    }

}
