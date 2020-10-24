<h1>Project Management Platform</h1>
<p>PMP is a platform for managing task lists for projects.</p>
<p>This app features:
  <ul>
    <li>Filtering for tasks by parameter(s)</li>
    <li>Batch creating tasks by template strings</li>
    <li>Batch deleting tasks by regex/parameter match</li>
  </ul>
</p>
     

<h2>Usage</h2>
<h3>Contents:</h3>
<h4>Accessing Platform</h4>
<p>
  <ol>
    <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#creating-an-account'>Creating an Account</a></li>
    <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#logging-in'>Logging In</a></li>
    <li>
      <ol>
        <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#filtering-entries'>As a Manager</a></li>
        <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#template-syntax'>As an Employee</a></li>
      </ol>
    </li>
  </ol>
</p>
<h4>Using Platform</h4>
<p>
  <ol>
    <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#creating-entries'>Creating Entries</a></li>
    <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#deleting-entries'>Deleting Entries</a></li>
    <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#filtering-entries'>Filtering Entries</a></li>
    <li><a href='https://github.com/morgan-sam/Project-Management-Platform/#template-syntax'>Template Syntax</a></li>
  </ol>
</p>

<h2>Accessing Platform</h2>

<h3>First time setup</h3>

<p>In order to access the PMP platform, a manager will create an account. During the account creation the manager will list the emails of the team members they want on their team. More team members can be added at a later time. The team members will recieve emails that allow them to setup their account password and settings.</p>

<h4>As a Manager</h4>
<p>(Manager setup instructions)</p>

<h4>As an Employee</h4>
<p>(Employee setup instructions)</p>

<h2>Using Platform</h2>

<h3>Creating Entries</h3>
<p>Entries can be created either via the create task bar or the batch new tasks popup:</p>

<h4>Create Task Bar</h4>
<p>First open the Create Task Bar:
<p>
  <ol>
    <li>Click <code>View</code>in the top left navigation menu</li>
    <li>Hover over <code>Taskbars</code></li>
    <li>Click <code>Show Create Task</code></li>
  </ol>
</p>
<p>Enter the task information into the relevant fields. The task will not add if the <i>task</i> or <i>teams</i> fields are left blank.</p>
<p>Next click <code>Add Task To Database</code>. The task will add and the bar will automatically close.</p>
<p>If you would like to add multiple tasks, ensure the <code>Keep Open</code> option is checked.</p>
<p>If you are adding large amounts of tasks that use similar formatting, it is much more efficient to use the Batch New Tasks feature.</p>

<h4>Batching New Tasks</h4>
<p>Multiple tasks can be added to the database by using a single template.</p>
<p>Templates can be very quickly written using strings, although it will likely be much easier to intially use the wizard to generate the correct template string.</p>
<p>To learn how to write templates, see the <a href='https://github.com/morgan-sam/Project-Management-Platform/#template-syntax'>template syntax section</a> of this document.</p>
<p>To open the wizard for a template input, click the ⚡ button next to the corresponding form.</p>


<h3>Deleting Entries</h3>
<p>Entries can be deleted either via selecting manually or batch deleting by matching regex/parameters:</p>
<h4>Manual Selection</h4>
<p>
  <ol>
    <li>Select the entries to delete by clicking and dragging over them</li>
    <li>Click <code>Edit</code> in the top left navigation menu</li>
    <li>Hover over <code>Delete</code></li>
    <li>Click <code>Delete Selected</code></li>
  </ol>
</p>

![delete_gif](docs/delete.gif?raw=true)

<h4>Batch Delete Tasks</h3>

<p>First open the Batch Delete Tasks popup:</p>
<p>
  <ol>
    <li>Click <code>File</code> in the top left navigation menu</li>
    <li>Click <code>Delete Tasks</code></li>
  </ol>
</p>

<p>For this example all completed tasks named <code>"Deployment"</code> tasks will be checked and then deleted:</p>
<p>
  <ol>
    <li>Click in the <code>Task Regex</code> form</li>
    <li>Type <code>"Deployment"</code></li>
    <li>Click the <code>Completion</code> dropdown</li>
    <li>Select <code>Complete</code></li>
    <li>Click the <code>Check Matched Tasks</code> button</li>
  </ol>
</p>

<p>The matched tasks to be deleted will then be displayed.To delete:</p>
  <ol>
    <li>Click the <code>Delete 𝑥 Tasks</code> button</li>
    <li>Click the <code>Confirm</code> button</li>
  </ol>
  
![batch_delete_gif](docs/batch_delete.gif?raw=true)

<h3>Filtering Entries</h3>
<p>The task list can be filtered for entries that meet a specific set of criterion.</p>
<p>Open the filter via the following method:</p>
<p>
  <ol>
    <li>Click on <code>View</code> in the top left navigation menu</li>
    <li>Hover over <code>Taskbars</code></li>
    <li>Click <code>Show Filter</code></li>
  </ol>
</p>

<p>For this example the task list is filtered for tasks that are highly urgent and involve only the 2 main teams:</p>
<p>
  <ol>
    <li>Select the <code>Active</code> checkbox to turn on the filter</li>
    <li>Set <code>Urgency Range</code> to minimum <code>4</code></li>
    <li>For the <code>Teams</code> dropdown, select <code>Team 1</code> & <code>Team 2</code></li>
    <li>Set <code>Match Type</code> to <code>AND</code></li>
  </ol>
</p>

![filtered1_gif](docs/filtered1.gif?raw=true)

<p>To further the example, the filtered list only needs to include tasks that have a deadline in the year 2020:</p>
<p>
  <ol>
    <li>Click the <code>Deadline</code> date</li>
    <li>Set the date to <code>31/12/2020</code></li>
    <li>Click the <code>✓</code> button</li>
  </ol>
</p>

![filtered2_gif](docs/filtered2.gif?raw=true)


<h3>Template Syntax</h3>

<h4>Task Template Syntax</h4>
<p><code>${n/l, #, a/d}</code></p>
<p>
  Where: 
  <ul>
    <li><code>n</code> is number, <code>l</code> is letter</li>
    <li><code>#</code> is number of digits, (skipped for letter)</li>
    <li><code>a</code> is ascending, <code>d</code> is descending</li>
  </ul>
</p>
<p>Examples:
    <ul>
    <li><code>BackendTest_${n}</code> with 3 tasks would output: <code>[BackendTest_0, BackendTest_1, BackendTest_2]</code></li>
    <li><code>FrontendTest_${n,3,d}</code> with 3 tasks would output: <code>[FrontendTest_002, FrontendTest_001, FrontendTest_000]</code></li>
    <li><code>Review_${l}</code> with 4 tasks would output: <code>[Review_a, Review_b, Review_c, Review_d]</code></li>
    <li><code>feature_${l,d}</code> with 5 tasks would output: <code>[feature_z, feature_y, feature_x, feature_w, feature_v]</code></li>
  </ul>
</p>
<h4>Date/Deadline Template Syntax</h4>
<p><code>${#/#/#} +/- # n d/w/m/y</code></p>
<p>
  Where: 
  <ul>
    <li><code>${#/#/#}</code> is the date/month/year (use <code>t</code> instead of a number for today's date/month/year)</li>
    <li><code><code>+</code> or <code>-</code></code> is whether the date modification is added or subtracted</li>
    <li><code>#</code> is the date modification multiplier</li>
    <li><code>n</code> is the task number index (leave out for static modification)</li>
    <li><code>d/w/m/y</code> is the unit of the modification (day, week, month or year)</li>
  </ul>
</p>
<p>Note:</p>
<blockquote><code>${t}</code> is shorthand for <code>${t/t/t}</code>, today's date.</blockquote>
<blockquote>Multiple modifications can be applied to one date (i.e. <code>${t} + nd + 5y - w</code>)</blockquote>
<p>Examples:
  <ul>
    <li><code>${1/1/2020}+2nd</code> with 5 tasks would output: <code>[1/1/2020, 1/3/2020, 1/5/2020, 1/7/2020, 1/9/2020]</code></li>
    <li><code>${31/10/2020}+5y</code> with 3 tasks would output: <code>[31/10/2025, 31/10/2025, 31/10/2025]</code></li>
    <li><code>${24/2/2020}-2nw</code> with 5 tasks would output: <code>[24/2/2020, 10/2/2020, 27/1/2020, 13/1/2020, 30/12/2019]</code></li>
    <li><code>${10/5/2021}-3nm+ny</code> with 4 tasks would output: <code>[10/5/2021, 10/2/2022, 10/11/2022, 10/8/2023]</code></li>
  </ul>
</p>

<h2>To Do</h2>
<p>Authentification is not yet implemented. Once implemented the manager account will be able to view the complete task list and assign tasks to individual teams. A team account will only be able to view the tasks assigned to them and tick them off as they are completed.</p>
