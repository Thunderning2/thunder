import { Component, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { GuildService } from 'src/app/services/guild.service';
import { PingService } from 'src/app/services/ping.service';
import { UsersService } from 'src/app/services/users.service';
import { WSService } from 'src/app/services/ws.service';
import { Lean } from 'src/app/types/entity-types';

@Component({
  selector: 'app-channel-tab',
  templateUrl: './channel-tab.component.html',
  styleUrls: ['./channel-tab.component.css']
})
export class ChannelTabComponent {
  @Input()
  public channel: Lean.Channel;

  public get guild() {
    return this.guildService.getGuild(this.channel.guildId);
  }

  constructor(
    private guildService: GuildService,
    public pings: PingService,
    public router: Router,
    public usersService: UsersService,
    private ws: WSService,
  ) {}

  public openMenu(event: MouseEvent, menuTrigger: MatMenuTrigger) {
    event.preventDefault();
    menuTrigger.menu.focusFirstItem('mouse');
    menuTrigger.openMenu();
  }

  public delete() {
    // const confirmation = prompt(`
    //   Are you sure you want to delete channel '${this.channel.name}'?
    //   Type 'CONFIRM' to continue.
    // `.trim());
    // if (confirmation !== 'CONFIRM') return;

    this.ws.on('CHANNEL_DELETE', async () => {
      await this.router.navigate([`/channels/${this.guild._id}`]);
    }, this);

    this.ws.emit('CHANNEL_DELETE', { channelId: this.channel._id }, this);
  }
}
